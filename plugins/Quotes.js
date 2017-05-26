var db = require('./DB/flatDB');
var q = {};

q.disableResponse = [];

q.addQuote = function(from, to, quote) {
	var d = new Date();
	var recordDate = d.getMonth() + '/' + d.getDay() + '/' + d.getFullYear();
	var row = {"date":recordDate,"from":from,"room":to,"quote":quote};
	db.insert(row);
};

q.say = function(bot, to, message, timeoutMultiplier) {
	setTimeout(function() {
		bot.say(to,message);
	},timeoutMultiplier*250)
};

q.getLastID = function() {
	var data = db.getDB();
	return data[data.length-1].id;
}

q.addQuoteCommand = function(arg) {
	var from=arg.from, 
		to=arg.to, 
		quote=arg.quote, 
		bot=arg.bot, 
		config=arg.config;

	if(quote[0].toLowerCase()==='!addquote') {
		if(quote.length<2) { return; }
		quote = quote.splice(1,quote.length);
		quote = quote.join(' ');
		this.addQuote(from,to,quote);
		if(this.disableResponse.indexOf(to)>-1) { return; }
		var replyQuote = quote.split('|');
		bot.say(to,'Added quote #'+ this.getLastID() + '.');
		for(var i=0;i<replyQuote.length;i++) {
			this.say(bot,to,replyQuote[i].trim(), i);
		}
	}
};

q.sayQuote = function(arg, sentQuote) {
	var from=arg.from, 
		to=arg.to, 
		quote=arg.quote, 
		bot=arg.bot, 
		config=arg.config;
	var replyQuote = sentQuote.split('|');
	for(var i=0;i<replyQuote.length;i++) {
		this.say(bot,to,replyQuote[i].trim(), i);
	}
};


q.sayRandomQuote = function(arg) {
	var from=arg.from, 
		to=arg.to, 
		quote=arg.quote, 
		bot=arg.bot, 
		config=arg.config;
	var theDB = db.getDB();
	var upperLimit = theDB.length;
	var randomID = Math.floor(Math.random() * upperLimit);
	var data = theDB[randomID];
	var by = data.from;
	var when = data.date;
	var headString = "Quote #" + data.id + " added by "+by+" on "+when+".";
	this.say(bot,to,headString,0);
	this.sayQuote(arg, data.quote);
};


q.getQuoteCommand = function(arg) {
	var from=arg.from, 
		to=arg.to, 
		quote=arg.quote, 
		bot=arg.bot, 
		config=arg.config;
	if(this.disableResponse.indexOf(to)>-1) { return; }
	if(quote[0].toLowerCase()==='!quote') {
		if(quote.length<2) { 
			this.sayRandomQuote(arg);
			return; 
		}
		var id = parseInt(quote[1]);
		if(id<1) { return; }
		var data = db.search({"id":id});
		if(data.length<1) { return;}
		var by = data[0].from;
		var when = data[0].date;
		var headString = "Quote #" + id + " added by "+by+" on "+when+".";
		this.say(bot,to,headString,0);
		this.sayQuote(arg, data[0].quote);
	}
};



q.getLastQuoteCommand = function(arg) {
	var from=arg.from, 
		to=arg.to, 
		quote=arg.quote, 
		bot=arg.bot, 
		config=arg.config;

	if(quote[0].toLowerCase()==='!lastquote' && this.disableResponse.indexOf(to)===-1) {
		var data = db.getDB();
		var end = data.length -1;
		var by = data[end].from;
		var when = data[end].date;
		var headString = "Quote #" + data[end].id + " added by "+by+" on "+when+".";
		this.say(bot,to,headString,0);
		this.sayQuote(arg, data[end].quote);
	}
};

q.toggleText = function(arg) {
     var from =arg.from,
         to=arg.to,
         quote=arg.quote,
         bot=arg.bot,
         config=arg.config;
     quote = quote.join(' ');
     if(quote === config.botName + ": disableResponse") {
	var index = this.disableResponse.indexOf(to);
	if(index===-1) {
            this.disableResponse.push(to);
            bot.say(to, "Disabled text on quotes.");
        }else{
            this.disableResponse.splice(index,1);
            bot.say(to, "Enabled text on quotes.");
        }
     };
};




exports.init = function() {
	db.openDatabase({dbName:'quoteDB',writeAccess:true});
}
//Message Event
exports.message = function(from, to, text, message, bot, config) {
	if(!config.plugins.quotes) { return; }
	var quote = text.split(' ');
	var argObj = {
		from:from,
		to:to,
		quote:quote,
		bot:bot,
		config:config
	};

	q.addQuoteCommand(argObj);
	q.getQuoteCommand(argObj);
	q.getLastQuoteCommand(argObj);
	q.toggleText(argObj);
}
