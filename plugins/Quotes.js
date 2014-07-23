var db = require('./flatDB/flatDB');
var q = {};

q.addQuote = function(from, to, quote) {
	var d = new Date();
	var recordDate = d.getMonth() + '/' + d.getDay() + '/' + d.getYear();
	var row = {"date":recordDate,"from":from,"room":to,"quote":quote};
	db.insert(row);
};

q.say = function(bot, to, message) {
	setTimeout(function() {
		bot.say(to,message);
	},i*250)
};
exports.init = function() {
	db.openDatabase({dbName:'quoteDB',writeAccess:true});
}
//Message Event
exports.message = function(from, to, text, message, bot, config) {
	var quote = text.split(' ');
	if(quote[0].toLowerCase()==='!addquote') {
		quote = quote.splice(0,1);
		quote = quote.join(' ');
		q.addQuote(from,to,quote);
		var replyQuote = quote.split('|');
		bot.say(to,'Added quote.');
		for(var i=0;i<replyQuote.length;i++) {
			q.say(bot,to,replyQuote[i]);
		}
	}
}
