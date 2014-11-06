function seen() {
	this.users = {};
}

seen.prototype.getNow = function() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = month +'/'+day+'/'+year+' '+hour+':'+minute+':'+second;   
    return dateTime;
};

seen.prototype.addUser = function(from) {
	this.users[from.toLowerCase()] = this.getNow();
}

seen.prototype.getUser = function(to, user, bot) {
	var reply;
	if(this.users[user.toLowerCase()] === undefined) {
		reply = "I have not seen " + user + " sorry.";
	}else{
		reply = "Last I saw " + user + " was " + this.users[user.toLowerCase()] + ".";
	}
	bot.say(to, reply);
}

var s = new seen();

// Plugin initialization.
exports.init = function (bot, config) {
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	s.addUser(from);
	if(config.plugins.seen===true) {
		var tArray = text.split(' ');
		if(tArray.length === 2 && 
			tArray[0].toLowerCase() === '!seen') {
			s.getUser(to, tArray[1], bot);
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
