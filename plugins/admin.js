



//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
    var messageArray = text.split(' ');
    //Trim Character.
    messageArray[0] = messageArray[0].substring(0,messageArray[0].length-1);
    //Are you talking to the bot?
    if(messageArray[0]==config.botName) {

          if(messageArray[1].toLowerCase()=='op') {
                console.log('Opping '+messageArray[2]);
                bot.send('MODE', config.channels[0], '+o', messageArray[2]);
          }

          if(messageArray[1].toLowerCase()=='deop') {
               if(messageArray[2]!=config.botName) {
                    bot.send('MODE', config.channels[0], '-o', messageArray[2]);
               }
          }




    }


}

//JOIN EVENT
exports.join = function(channel, nick, message, bot, config){
    if(nick != config.botName && config.autoOp==true) {
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