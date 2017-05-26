//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.define) {
		text = text.split(' ');
		if(text.length>1 && text[0].toLowerCase().indexOf(config.botName.toLowerCase())>-1 && text[1].toLowerCase()=='define') {
			var http = require('http');
			var options = {
			  host: 'api.wordnik.com',
			  path: '/v4/word.json/'+encodeURI(text.splice(2).join(" "))+'/definitions?limit=200&includeRelated=true&sourceDictionaries=wiktionary&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
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
				  		if(js.length>0) {
				  			bot.say(to, from+': '+js[0].text);
				  		}else{
				  			bot.say(to, from+': I do not have a definition for that word');
				  		}
			  		}catch(e) {
			  			bot.say(to, from+': I do not have a definition for that word/phrase.');
			  		}
			  });
			});
		}
	}
}
