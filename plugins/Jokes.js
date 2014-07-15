//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
  if(config.plugins.jokes && text.toLowerCase().indexOf('lets hear a joke')>-1) {
    var request = require('request');

    var options = {
      url: 'http://reddit.com/r/jokes.json',
      json: true
    };

    request(options, function(error, response, body) {
      if (!error) {
        var children = body.data.children;
        var joke = children[Math.floor(Math.random() * children.length)].data;

        var joketext = joke.title.replace(/\.\.\.$/, '') + ' ' + joke.selftext.replace(/^\.\.\.\s*/, '');

        bot.say(to, joketext);
      }
    });
  }
};
