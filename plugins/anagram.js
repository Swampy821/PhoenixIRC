
function anagram(bot, to, text) {
  var req = require('request');
  req.post('http://www.sternestmeanings.com/say.json',
           { form: { msg: text },
             json: true
           },
           function (error, response, body) {
             if (!error && response.statusCode === 200) {
               if (toString.call(body) === "[object Array]") {
                 bot.say(to + body[0]);
               } else {
                 bot.say(to + ': "' + text + '" is an anagram for "' + body.message.response + '"');
               }
             } else {
               bot.say("No anagram for you!");
             }
           }
  );
}

exports.message = function(from, to, text, message, bot, config) {
  var trigger = config.botName + ': anagram';
  if (config.plugins.anagram &&
      text.toLowerCase().indexOf(trigger.toLowerCase()) === 0) {
    anagram(bot, to, text.substring(trigger.length);
  }
}
