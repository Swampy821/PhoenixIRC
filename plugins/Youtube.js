var jsdom = require('jsdom');

exports.message = function(from, to, text, message, bot, config) {
    if(config.plugins.youtube && text.indexOf('youtube.com')>-1) {
        jsdom.env(
          text,
          ["http://code.jquery.com/jquery.js"],
          function (errors, window) {
            if(window.$("#eow-title").text().length>5) {
                bot.say(to,window.$("#eow-title").text().replace(/\n|\r/g,''));
            }
          }
        );       
    }
}
