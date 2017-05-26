
var fs = require('fs');
function logger(){
	this.file = 'tmp_files/log.txt';
}

logger.prototype.log = function(from, to, text) {
	var self = this;
	fs.appendFile(self.file, to + ' - ' + from + ': ' + text + '\n', function(err) {
	   if (err) throw err; 
	});
};

var l = new logger();


// Plugin initialization.
exports.init = function (bot, config) {

}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	l.log(from, to, text);
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
