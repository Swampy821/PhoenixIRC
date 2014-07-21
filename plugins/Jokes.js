//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.jokes && text.toLowerCase().indexOf('lets hear a joke')>-1) {
			var http = require('http');
			var options = {
			  host: 'www.jokels.com',
			  path: '/random_joke'
			};
			var chk = '';
			http.get(options, function(resp){
				resp.setEncoding('utf8');
			  resp.on('data', function(chunk){
			  	   chk+=chunk;
			  });
			  resp.on('end',function() {
			  		try{
				  		js = JSON.parse(chk);
				  			bot.say(to,js.joke.question);
				  			setTimeout(function() {
				  				bot.say(to,js.joke.answer);
				  			},5000);
			  		}catch(e) {
			  		}
			  });
			});
	}
}