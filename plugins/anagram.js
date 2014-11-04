var req = require('request');

function anagram(bot, from, to, text) {
  req.post({ url: 'http://www.sternestmeanings.com/say.json',
             form: { msg: text }
           },
           function (error, response, body) {
             if (!error && response.statusCode === 200) {
               body = JSON.parse(body);
               if (toString.call(body) === "[object Array]") {
                 bot.say(to, from + ': ' + body[0]);
               } else {
                 bot.say(to, from + ': "' + text + '" is an anagram for "' + body.message.response + '"');
               }
             } else {
               bot.say(to, from + ": No anagram for you!");
             }
           }
  );
}

exports.message = function(from, to, text, message, bot, config) {
  var trigger = '!anagram ';
  if (config.plugins.anagram &&
      text.toLowerCase().indexOf(trigger.toLowerCase()) === 0) {
    anagram(bot, from, to, text.substring(trigger.length));
  }
};
