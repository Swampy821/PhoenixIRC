



//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
    var messageArray = text.split(' ');
    var channel = message.args[0];
    //Trim Character.
    messageArray[0] = messageArray[0].substring(0,messageArray[0].length-1);
    //Are you talking to the bot?
    if(messageArray[0]==config.botName && messageArray.length>1) {
          //Opper
          if(messageArray[1].toLowerCase()=='op' && config.autoOpChannels.indexOf(to.toLowerCase())>-1) {
             if(messageArray[2]!=config.botName) {
                if(config.nicks[messageArray[2]]!=undefined) {
                  bot.send('MODE', channel, '+o', messageArray[2]);
                }
              }
              
          }
          //Deopper
          if(messageArray[1].toLowerCase()=='deop' && config.autoOpChannels.indexOf(to.toLowerCase())>-1) {
               if(messageArray[2]!=config.botName) {
                 if(config.nicks[messageArray[2]]!=undefined) {
                    bot.send('MODE', channel, '-o', messageArray[2]);
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
    if(nick != config.botName && config.autoOp==true && config.autoOpChannels.indexOf(channel.toLowerCase())>-1) {
        bot.send('MODE', config.channels[0], '+o', nick);
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
