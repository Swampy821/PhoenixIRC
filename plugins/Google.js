//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.google) {
		var msg = text.split(' ');
		var googleCount=0;
		if(msg.length>1) {

			for(var i=0;i<msg.length-1;i++) {
				if(msg[i].length>1) {
					googleCount++;
				}
			}
			 var googleLocation = text.toLowerCase().indexOf("google");
			 text = text.substr(googleLocation + "google".length, text.length).trim();
			if(msg[0].toLowerCase().indexOf(config.botName.toLowerCase())>-1 && msg[1].toLowerCase().indexOf('google')>-1 && text.length>0 && msg.length>1) {
				text = text.split(' ');
				var newArray = [];
				var googleSearch
				if(text.length>1) {
					for(var i=2;i<text.length;i++) {
						newArray.push(text[i]);
					}
					googleSearch=newArray.join('+');
				}else{
					googleSearch=text[0];
				}
				var finalGoogle = 'http://google.com/#q='+googleSearch;
				bot.say(to,from+': '+finalGoogle);
			}
		}
	}
}