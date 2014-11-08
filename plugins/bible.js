var request = require('request');

function Bible() {}

Bible.prototype.getVerse = function(bot, to, from) {
    request('http://labs.bible.org/api/?passage=random&type=json', function(error, message, body) {
        var body = JSON.parse(body);
        body = body[0];
        body.text = body.text.replace(/<(?:.|\n)*?>/gm, '');
        var sendMessage = from + ': ' + body.bookname + ' ' + body.chapter + ':' + body.verse + ' ' + body.text;
        bot.say(to, sendMessage);
    });
};

var b = new Bible();

// Plugin initialization.
exports.init = function (bot, config) {
};

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
    if(config.plugins.bible===true) {
        var tArray = text.split(' ');
        if(tArray.length === 2) {
            if(tArray[0].toLowerCase() === config.botName.toLowerCase() + ':' &&
                tArray[1].toLowerCase() === 'verse') {
                b.getVerse(bot, to, from);
            }
        }
    }
};

//JOIN EVENT
exports.join = function(channel, nick, message, bot, config){

};

//PART EVENT
exports.part = function(channel, nick, message, bot, config){

};

//PART EVENT
exports.raw = function(message, bot, config){

};

//ACTION EVENT
exports.action = function(from, to, message, bot, config){

};
