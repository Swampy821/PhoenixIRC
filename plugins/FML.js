function FML(bot, to) {
	var http = require('http');
	var options = {
	  host: 'ajax.googleapis.com',
	  path: '/ajax/services/feed/load?v=1.0&num=10&q=http://feeds.feedburner.com/fmylife'
	};
	var chk = '';
	http.get(options, function(resp){
		resp.setEncoding('utf8');
	  resp.on('data', function(chunk){
	  	   chk+=chunk;
	  });

	  resp.on('end',function() {
	  		js = JSON.parse(chk);
	  		random = Math.round(Math.random() * js.responseData.feed.entries.length)
	  	 	var thePost = js.responseData.feed.entries[random].content.replace(/<\/?[^>]+(>|$)/g, "");
	  	 	bot.say(to,thePost);
	  });
	});
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(text.toLowerCase()=='.fml' && config.plugins.fml==true) {
		FML(bot,to);
	}
}
