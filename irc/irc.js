/*
	irc.js - Node JS IRC client library

	(C) Copyright Martyn Smith 2010

	This library is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This library is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this library.  If not, see <http://www.gnu.org/licenses/>.
*/

exports.Client = Client;
var util = require('util');

var colors = require('./colors');
exports.colors = colors;

function Client(server, nick, opt) {
	var self = this;
	self.opt = {
		server: server,
		nick: nick,
		password: null,
		userName: 'nodebot',
		realName: 'nodeJS IRC client',
		port: 6667,
		debug: false,
		showErrors: false,
		autoRejoin: true,
		autoConnect: true,
		channels: [],
		retryCount: 50,
		retryDelay: 2000,
		secure: false,
		selfSigned: false,
		certExpired: false,
		floodProtection: true,
		floodProtectionDelay: 1000,
		stripColors: false,
		channelPrefixes: "&#",
		messageSplit: 512,
		webircPassword: null,
		userIp : null,
		userHostName: null
	};

	// Features supported by the server
	// (initial values are RFC 1459 defaults. Zeros signify
	// no default or unlimited value)
	self.supported = {
		channel: {
			idlength: [],
			length: 200,
			limit: [],
			modes: { a: '', b: '', c: '', d: ''},
			types: self.opt.channelPrefixes
		},
		kicklength: 0,
		maxlist: [],
		maxtargets: [],
		modes: 3,
		nicklength: 9,
		topiclength: 0,
		usermodes: ''
	};

	if (typeof arguments[2] == 'object') {
		var keys = Object.keys(self.opt);
		for (var i = 0; i < keys.length; i++) {
			var k = keys[i];
			if (arguments[2][k] !== undefined)
				self.opt[k] = arguments[2][k];
		}
	}

	if (self.opt.floodProtection) {
		self.activateFloodProtection();
	}

	// TODO - fail if nick or server missing
	// TODO - fail if username has a space in it
	if (self.opt.autoConnect === true) {
		self.connect();
	}

	self.addListener("raw", require('./incoming.js')(self)); // }}}

	self.addListener('kick', function(channel, who, by, reason) {
		if ( self.opt.autoRejoin )
			self.send.apply(self, ['JOIN'].concat(channel.split(' ')));
	});
	self.addListener('motd', function (motd) {
		self.opt.channels.forEach(function(channel) {
			self.send.apply(self, ['JOIN'].concat(channel.split(' ')));
		});
	});

	process.EventEmitter.call(this);
}

util.inherits(Client, process.EventEmitter);

require("./outgoing.js")(Client);

