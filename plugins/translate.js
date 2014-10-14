var request = require('request');
function translate() {}
translate.prototype.process = function(text, language, callback) {
   request('http://mymemory.translated.net/api/get?q='+text+'&langpair='+language, function(error, response, body) {
      body = JSON.parse(body);  
      if(body.responseData !== undefined) {
        callback(body.responseData.translatedText);
      }else{
        callback('I do not have a translation for that!');
      }
   });
};

var t = new translate();

// Plugin initialization.
exports.init = function (bot, config) {
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
  if(text.split(' ')[0] == '!translate') {
     var lang = text.split(' ')[1];     
     var transtext = text.split(' ').splice(2,text.length).join(' ');
     t.process(transtext, lang, function(newText) {
         bot.say(to, from+': ' + newText);
     });
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
