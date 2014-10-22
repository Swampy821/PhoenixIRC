var request = require('request');
// Plugin initialization.
var last = {
	title: '',
	price: '',
	url:''
};

function w() {
    this.interval = 10000;
}

w.prototype.init = function(config, to, bot) {
	var self = this;
	self.checkWoot(config, function(response) {
		var wObj = JSON.parse(response).Offers[0];
		var title = wObj.Title;
		if(title!==last.title) {
			last.title=title;
			last.price = wObj.Items[0].SalePrice
			last.url = wObj.Url;
			bot.say(to,'NEW ITEM: ' + title + ' for $' + last.price);
			bot.say(to,last.url);
		}
		setTimeout(function() {
			self.init(config, to, bot);
		}, self.interval);
	});
}

w.prototype.checkWoot = function(config, callback) {
	request(config.plugins.wootOff.apiUrl, function(error, message, body) {
		callback(body);
	});
}

var woot = new w();

exports.init = function (bot, config) {
	if(config.plugins.wootOff.active===true) {
		woot.init(config, config.channels[0], bot);
	}
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(text==='!wootToggle') {
		if(config.plugins.wootOff.active===true) {
			config.plugins.wootOff.active = false;
			bot.say(to, 'Turning woot updates off.');
		}else{
			config.plugins.wootOff.active = true;
			bot.say(to, 'Turning woot updates on.');
		}
	}
	if(config.plugins.wootOff.active===true) {
		var textArray = text.split(' ');
		if(textArray.length>1 && 
			textArray[0].toLowerCase() === config.botName.toLowerCase() + ':' &&
			textArray[1].toLowerCase() === 'woot') {
			bot.say(to, 'Current Woot: ' + last.title + ' for $' + last.price);
			bot.say(to, last.url);
		}
	}
}

//JOIN EVENT
exports.join = function(channel, nick, message, bot, config){

}

//PART EVENT
exports.part = function(channel, nick, message, bot, config){

}

//PART EVENT
exports.raw = function(message, bot, config){

}

//ACTION EVENT
exports.action = function(from, to, message, bot, config){

}
