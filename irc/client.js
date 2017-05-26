var irc = require('./irc.js');
var ident = require('./ident.js');
module.exports.Client = Client;
module.exports.colors = irc.colors;
module.exports.startIdentServer = function(port) {
	ident.init(port);//start ident server.	
};

function Client(server, nick, opt) {
	var client = new irc.Client(server, nick, opt);
	if(opt.identId) {
		client.conn.on("connect",function() {
			ident.register(this.address().port, this.remotePort, opt.identId);
		});

		client.conn.on("disconnect", function() {
			ident.remove(this.address().port,this.remotePort);
		});
	}
	client.connQueue = [];
	client.sayQueues = {};
	client.addListener('join', function(channel, from) {
		channel = channel.toLowerCase();
		if (from === client.nick && client.sayQueues[channel]) {
			//console.log("Sending queued messages for " + channel);
			client.sayQueues[channel].forEach(function(message) {
				//	console.log("saying:",message);
				client.say(channel, message);
			});
			client.sayQueues[channel] = [];
		}
	});
	client.addListener('registered', function() {
		//console.log(client.nick + " is connected to " + server);
		client.connected = true;
		// Perform queued actions.
		client.connQueue.forEach(function(action) {
			//log("Dequeueing", action.args);
			action.oper.apply(client, action.args);
		});

		client.connQueue = [];
	});

	client.say = (function(say) {
		return function(channel, message) {
			//console.log(channel , ", message", message);
			channel = channel.toLowerCase();
			if (!client.connected) {
				//console.log("Queueing " + message.substr(0,32) + " for " + channel + ".");
				if (!client.sayQueues[channel]) {
					client.sayQueues[channel] = [];
				}
				client.sayQueues[channel].push(message);
			} else {
				//console.log("Sending " + message.substr(0,32) + " to " + channel + ".");
				say.apply(this, arguments);
			}
		};
	}(client.say));


	// Generic wrapper that wraps operations to do when the server connects.

	function queueConn(oper, callback) {
		return function() {
			if (!client.connected) {
				client.connQueue.push({oper: oper, args: arguments});
			} else {
				if (callback) callback.apply(this, arguments);
				oper.apply(this, arguments);
			}
		};
	}

	client.join = queueConn(client.join);
	client.part = queueConn(client.part);
	client.rename = queueConn(function(nick) {
		client.opt.nick = nick;
		//console.log("Sending nick change to irc:" + nick);
		client.send("NICK", nick);
	});
	client.connected = false;

	return client;
}
