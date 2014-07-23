//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.define) {
		text = text.split(' ');
		if(text.length>1 && text[0].toLowerCase().indexOf(config.botName.toLowerCase())>-1 && text[1].toLowerCase()=='udefine') {
			var http = require('http');
			var options = {
			  host: 'api.urbandictionary.com',
			  path: '/v0/define?term='+encodeURI(text.splice(2).join(" "))
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
				  		if(js.list[0].definition.length>0) {
				  			if(js.list[0].definition.length>3000) {
							bot.say(to, 'Fuck you '+from+ '!');
}else{
							bot.say(to, from+': '+js.list[0].definition);
}
				  		}else{
				  			bot.say(to, from+': I do not have a definition for that word');
				  		}
			  		}catch(e) {
			  			bot.say(to, from+': I don\'t have a definition for that word/phrase.');
			  		}
			  });
			});
		}
	}
}
