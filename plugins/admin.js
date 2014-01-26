



//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
    var messageArray = text.split(' ');
    var channel = to;
    //Trim Character.
    messageArray[0] = messageArray[0].substring(0,messageArray[0].length-1);
    //Are you talking to the bot?
    if(messageArray[0]==config.botName && messageArray.length>1) {
          //Opper
          for(var i=0; i<config.autoOpChannels.length-1;i++) {
              config.autoOpChannels[i] = config.autoOpChannels[i].toLowerCase();
          }
          if(messageArray[1].toLowerCase()=='op' && config.autoOpChannels.indexOf(to.toLowerCase())>-1) {
             if(messageArray[2]!=config.botName) {
                if(config.nicks[to][messageArray[2]]!=undefined) {
                  bot.send('MODE', to, '+o', messageArray[2]);
                }
              }
          }
          //Deopper
          if(messageArray[1].toLowerCase()=='deop' && config.autoOpChannels.indexOf(to.toLowerCase())>-1) {
               if(messageArray[2]!=config.botName) {
                 if(config.nicks[to][messageArray[2]]!=undefined) {
                    bot.send('MODE', to, '-o', messageArray[2]);
                  }
               }
          }
          //Quitter
          if(messageArray[1].toLowerCase()=='die' && config.admins.indexOf(from)>-1) {
               process.exit();
          }
    }
}

//JOIN EVENT
exports.join = function(channel, nick, message, bot, config){
  for(var i=0;i<config.autoOpChannels.length-1;i++) {
    config.autoOpChannels[i] = config.autoOpChannels[i].toLowerCase();  
  }
    if(nick != config.botName && config.autoOp==true && config.autoOpChannels.indexOf(channel.toLowerCase())>-1) {
        bot.send('MODE', channel, '+o', nick);
    }
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
