var request = require('request');

function xk() {}

xk.prototype.getLatest = function(to, from, bot) {	
	request('http://xkcd.com/info.0.json', function(error, response, body) {
		body = JSON.parse(body);
		var top = body.num;
		var randNumber = Math.floor(Math.random() * top) + 1;
		request('http://xkcd.com/' + randNumber + '/info.0.json', function(er, res, bod) {
			bod = JSON.parse(bod);
			bot.say(to, from + ': ' + bod.safe_title + ' - ' + bod.alt);
			bot.say(to, from + ': ' + bod.img);
		});
	});
};

xk.prototype.getSpecific = function(to, from, bot, num) {
	if(num==='latest') {
		request('http://xkcd.com/info.0.json', function(error, response, body) {
			body = JSON.parse(body);
			bot.say(to, from + ': ' + body.safe_title + ' - ' + body.alt);
			bot.say(to, from + ': ' + body.img);
		});
	}else if(typeof num === 'number'){
		request('http://xkcd.com/' + num + '/info.0.json', function(error, response, body) {
			body = JSON.parse(body);
			bot.say(to, from + ': ' + body.safe_title + ' - ' + body.alt);
			bot.say(to, from + ': ' + body.img);
		});
	}
};



var x = new xk();

// Plugin initialization.
exports.init = function (bot, config) {
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.xkcd === true && 
		text.toLowerCase().indexOf(config.botName.toLowerCase() + ': xkcd') > -1) {
		var tArray = text.split(' ');
		if(tArray.length===2) {
			x.getLatest(to, from, bot);
		}else{
			x.getSpecific(to, from, bot, tArray[2]);
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
