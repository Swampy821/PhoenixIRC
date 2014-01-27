
var config = require("./config.js");

var irc = require("irc");

var fs = require('fs');

var plugins = Array();

var bot = new irc.Client(config.server, config.botName, {
  channels:config.channels,
  userName:config.userName,
  realName:config.realName
});


// Auto Load All Plugins
var i = 0;
require('fs').readdirSync(__dirname + '/plugins/').forEach(function(file) {
  if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
    plugins[i] = require('./plugins/' + file);
    i++;
  }
});

//Message Listener
bot.addListener("message", function (from, to, text, message){
    for(var i=0;i<plugins.length;i++)
    {
      if(typeof plugins[i].message == 'function'){
        plugins[i].message(from, to, text, message, bot, config);
      }
    }
});
//JOIN EVENT HANDLER
bot.addListener("join", function (channel, nick, message) { 
  for(var i=0;i<plugins.length;i++)
    {
      if(typeof plugins[i].join == 'function'){
        plugins[i].join(channel, nick, message, bot, config);
      }
    }
});
//PART EVENT HANDLER
bot.addListener("part", function (channel, nick, message) { 
  for(var i=0;i<plugins.length;i++)
    {
      if(typeof plugins[i].part == 'function'){
        plugins[i].part(channel, nick, message, bot, config);
      }
    }
});
//RAW EVENT HANDLER
bot.addListener("raw", function (message) { 
  for(var i=0;i<plugins.length;i++)
    {
      if(typeof plugins[i].raw == 'function'){
        plugins[i].raw(message, bot, config);
      }
    }
});

//ACTION EVENT HANDLER
bot.addListener("action", function (from, to, message) { 
  for(var i=0;i<plugins.length;i++)
    {
      if(typeof plugins[i].action == 'function'){
        plugins[i].action(from, to, message, bot, config);
      }
    }
});

//LOAD CURRENT NICKS INTO CONFIG EVENT HANDLER
bot.addListener("names", function (channel, nicks) { 
  config.nicks[channel] = Object.keys(nicks);
});
