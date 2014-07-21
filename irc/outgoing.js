var net  = require('net');
var util = require('util');
var parseMessage = require('./parseMessage.js');
module.exports = function(Client) {
	Client.prototype.conn = null;
	Client.prototype.prefixForMode = {};
	Client.prototype.modeForPrefix = {};
	Client.prototype.chans = {};
	Client.prototype._whoisData = {};
	Client.prototype.chanData = function( name, create ) { // {{{
		var key = name.toLowerCase();
		if ( create ) {
			this.chans[key] = this.chans[key] || {
				key: key,
				serverName: name,
				users: {},
				mode: ''
			};
		}

		return this.chans[key];
	} // }}}
	Client.prototype.connect = function ( retryCount, callback ) { // {{{
		var self = this;
		if ( typeof(retryCount) === 'function' ) {
			callback = retryCount;
			retryCount = undefined;
		}
		retryCount = retryCount || 0;
		if (typeof(callback) === 'function') {
			this.once('registered', callback);
		}


		self.chans = {};
		// try to connect to the server
		if (self.opt.secure) {
			var creds = self.opt.secure;
			if (typeof self.opt.secure !== 'object') {
				creds = {};
			}

			self.conn = tls.connect(self.opt.port, self.opt.server, creds, function() {
				// callback called only after successful socket connection
				self.conn.connected = true;
				if (self.conn.authorized ||
					(self.opt.selfSigned &&
						(self.conn.authorizationError === 'DEPTH_ZERO_SELF_SIGNED_CERT' ||
							self.conn.authorizationError === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE')) ||
					(self.opt.certExpired &&
						self.conn.authorizationError === 'CERT_HAS_EXPIRED')) {
					// authorization successful
					self.conn.setEncoding('utf-8');
					if ( self.opt.certExpired &&
						self.conn.authorizationError === 'CERT_HAS_EXPIRED' ) {
						util.log('Connecting to server with expired certificate');
					}
					if(self.opt.webircPassword !== null && self.opt.userHostName !== null && self.opt.userIp !== null) {
						self.send("WEBIRC",
							self.opt.webircPassword,
							self.opt.userName,
							self.opt.userHostName,
							self.opt.userIp
						);
					}
					if ( self.opt.password !==  null ) {
						self.send( "PASS", self.opt.password );
					}
					util.log('Sending irc NICK/USER');
					self.send("NICK", self.opt.nick);
					self.nick = self.opt.nick;
					self.send("USER", self.opt.userName, 8, "*", self.opt.realName);
					self.emit("connect");
				} else {
					// authorization failed
					util.log(self.conn.authorizationError);
				}
			});
		}else {
			self.conn = net.createConnection(self.opt.port, self.opt.server);
		}
		self.conn.requestedDisconnect = false;
		self.conn.setTimeout(0);
		self.conn.setEncoding('utf8');
		self.conn.addListener("connect", function () {
			//Sending Web IRC header.
			if(self.opt.webircPassword !== null && self.opt.userHostName !== null && self.opt.userIp !== null) {
				self.send("WEBIRC",
					self.opt.webircPassword,
					self.opt.userName,
					self.opt.userHostName,
					self.opt.userIp
				);
			}

			if ( self.opt.password !==  null ) {
				self.send( "PASS", self.opt.password );
			}
			self.send("NICK", self.opt.nick);
			self.nick = self.opt.nick;
			self.send("USER", self.opt.userName, 8, "*", self.opt.realName);
			self.emit("connect");
		});
		var buffer = '';
		self.conn.addListener("data", function (chunk) {
			buffer += chunk;
			var lines = buffer.split("\r\n");
			buffer = lines.pop();
			lines.forEach(function (line) {
				var message = parseMessage(line, self.opt.stripColors);
				try {
					self.emit('raw', message);
				} catch ( err ) {
					if ( !self.conn.requestedDisconnect ) {
						throw err;
					}
				}
			});
		});
		self.conn.addListener("end", function() {
			if ( self.opt.debug )
				util.log('Connection got "end" event');
		});
		self.conn.addListener("close", function() {
			if ( self.opt.debug )
				util.log('Connection got "close" event');
			if ( self.conn.requestedDisconnect )
				return;
			if ( self.opt.debug )
				util.log('Disconnected: reconnecting');
			if ( self.opt.retryCount !== null && retryCount >= self.opt.retryCount ) {
				if ( self.opt.debug ) {
					util.log( 'Maximum retry count (' + self.opt.retryCount + ') reached. Aborting' );
				}
				self.emit( 'abort', self.opt.retryCount );
				return;
			}

			if ( self.opt.debug ) {
				util.log( 'Waiting ' + (self.opt.retryDelay << retryCount) + 'ms before retrying' );
			}
			setTimeout( function() {
				self.connect( retryCount + 1 );
			}, (self.opt.retryDelay << retryCount) );//exponential backoff
		});
		self.conn.addListener("error", function(exception) {
			self.emit("netError", exception);
		});
	}; // }}}
	Client.prototype.disconnect = function ( message, callback ) { // {{{
		if ( typeof(message) === 'function' ) {
			callback = message;
			message = undefined;
		}
		message = message || "node-irc says goodbye";
		var self = this;
		if ( self.conn.readyState == 'open' ) {
			self.send( "QUIT", message );
		}
		self.conn.requestedDisconnect = true;
		if (typeof(callback) === 'function') {
			self.conn.once('end', callback);
		}
		self.conn.end();
	}; // }}}
	Client.prototype.send = function(command) { // {{{
		var args = Array.prototype.slice.call(arguments);

		// Note that the command arg is included in the args array as the first element

		if ( args[args.length-1].match(/\s/) || args[args.length-1].match(/^:/) || args[args.length-1] === "" ) {
			args[args.length-1] = ":" + args[args.length-1];
		}

		if ( this.opt.debug )
			util.log('SEND: ' + args.join(" "));

		if ( ! this.conn.requestedDisconnect ) {
			this.conn.write(args.join(" ") + "\r\n");
		}
	}; // }}}
	Client.prototype.activateFloodProtection = function(interval) { // {{{

		var cmdQueue = [],
			safeInterval = interval || this.opt.floodProtectionDelay,
			self = this,
			origSend = this.send,
			dequeue;

		// Wrapper for the original function. Just put everything to on central
		// queue.
		this.send = function() {
			cmdQueue.push(arguments);
		};

		dequeue = function() {
			var args = cmdQueue.shift();
			if (args) {
				origSend.apply(self, args);
			}
		};

		// Slowly unpack the queue without flooding.
		setInterval(dequeue, safeInterval);
		dequeue();


	}; // }}}
	Client.prototype.join = function(channel, callback) { // {{{
		this.once('join' + channel, function () {
			// if join is successful, add this channel to opts.channels
			// so that it will be re-joined upon reconnect (as channels
			// specified in options are)
			if (this.opt.channels.indexOf(channel) == -1) {
				this.opt.channels.push(channel);
			}

			if ( typeof(callback) == 'function' ) {
				return callback.apply(this, arguments);
			}
		});
		this.send.apply(this, ['JOIN'].concat(channel.split(' ')));
	} // }}}
	Client.prototype.part = function(channel, callback) { // {{{
		if ( typeof(callback) == 'function' ) {
			this.once('part' + channel, callback);
		}

		// remove this channel from this.opt.channels so we won't rejoin
		// upon reconnect
		if (this.opt.channels.indexOf(channel) != -1) {
			this.opt.channels.splice(this.opt.channels.indexOf(channel), 1);
		}

		this.send('PART', channel);
	} // }}}
	Client.prototype.say = function(target, text) { // {{{
		var self = this;
		if (typeof text !== 'undefined') {
			text.toString().split(/\r?\n/).filter(function(line) {
				return line.length > 0;
			}).forEach(function(line) {
					var r = new RegExp(".{1," + self.opt.messageSplit + "}", "g");
					while ((messagePart = r.exec(line)) != null) {
						self.send('PRIVMSG', target, messagePart[0]);
						self.emit('selfMessage', target, messagePart[0]);
					}
				});
		}
	} // }}}
	Client.prototype.action = function(channel, text) { // {{{
		var self = this;
		if (typeof text !== 'undefined') {
			text.toString().split(/\r?\n/).filter(function(line) {
				return line.length > 0;
			}).forEach(function(line) {
					self.say(channel, '\u0001ACTION ' + line + '\u0001');
				});
		}
	} // }}}
	Client.prototype.notice = function(target, text) { // {{{
		this.send('NOTICE', target, text);
	} // }}}
	Client.prototype.whois = function(nick, callback) { // {{{
		if ( typeof callback === 'function' ) {
			var callbackWrapper = function(info) {
				if ( info.nick == nick ) {
					this.removeListener('whois', callbackWrapper);
					return callback.apply(this, arguments);
				}
			};
			this.addListener('whois', callbackWrapper);
		}
		this.send('WHOIS', nick);
	} // }}}
	Client.prototype.list = function() { // {{{
		var args = Array.prototype.slice.call(arguments, 0);
		args.unshift('LIST');
		this.send.apply(this, args);
	} // }}}
	Client.prototype._addWhoisData = function(nick, key, value, onlyIfExists) { // {{{
		if ( onlyIfExists && !this._whoisData[nick] ) return;
		this._whoisData[nick] = this._whoisData[nick] || {nick: nick};
		this._whoisData[nick][key] = value;
	} // }}}
	Client.prototype._clearWhoisData = function(nick) { // {{{
		// Ensure that at least the nick exists before trying to return
		this._addWhoisData(nick, 'nick', nick);
		var data = this._whoisData[nick];
		delete this._whoisData[nick];
		return data;
	} // }}}
	Client.prototype._handleCTCP = function(from, to, text, type) {
		text = text.slice(1)
		text = text.slice(0, text.indexOf('\1'))
		var parts = text.split(' ')
		this.emit('ctcp', from, to, text, type)
		this.emit('ctcp-'+type, from, to, text)
		if (type === 'privmsg' && text === 'VERSION')
			this.emit('ctcp-version', from, to)
		if (parts[0] === 'ACTION' && parts.length > 1)
			this.emit('action', from, to, parts.slice(1).join(' '))
		if (parts[0] === 'PING' && type === 'privmsg' && parts.length > 1)
			this.ctcp(from, 'notice', text)
	}
	Client.prototype.ctcp = function(to, type, text) {
		return this[type === 'privmsg' ? 'say' : 'notice'](to, '\1'+text+'\1');
	}
}