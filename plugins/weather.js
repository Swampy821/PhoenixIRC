var request = require('request');

// Plugin initialization.
exports.init = function (bot, config) {
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	var tArray = text.split(' ');
	if(config.plugins.weather===true &&
		tArray.length>2 &&
		tArray[0].toLowerCase() === config.botName.toLowerCase() + ':' &&
		tArray[1].toLowerCase() === 'weather') {
		tArray.splice(0,2)
		var location = tArray.join('');
		request('http://api.openweathermap.org/data/2.5/weather?units=imperial&q=' + location, function(error, message, body) {
			var body = JSON.parse(body);
			var main = body.main;
			if(main===undefined) { return; }
			var temp = main.temp;
			var humid = main.humidity;
			var low = main.temp_min;
			var high = main.temp_max;
			location = location.split(',').join(', ');
			var statement = "The weather in " + location + " is " + temp + " degrees F. Humidity is " + 
				humid + ". The high is " + high + "F and the low is " + low + "F.";
			bot.say(to, from + ": " + statement);
		});
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
