
var fs = require('fs');
function logger(){
	this.file = 'tmp_files/log.txt';
}

logger.prototype.createFileIfNotFound = function() {
	var self = this;
	fs.exists(self.file, function(exists) {
		if(!exists) {
			fs.writeFile(self.file);
		}
	});
};

logger.prototype.log = function(from, to, text) {
	var self = this;
	fs.appendFile(self.file, to + ' - ' + from + ': ' + text + '\n', function() {
	   fs.close(self.file);	     
	});
};

var l = new logger();


// Plugin initialization.
exports.init = function (bot, config) {
	l.createFileIfNotFound();
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
