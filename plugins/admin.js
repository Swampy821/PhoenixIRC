function adminTools() {
    function lCaseNicks(nicks) {
        var arr = Array();
        for(var i=0; i<nicks.length-1;i++) {
          arr[i] = nicks[i].toLowerCase();
        }
        return arr;
    }


    this.kick = function(text, bot, config, to) {
        text = text.split(' ');
        if(text.length>2) {
            var nicks = lCaseNicks(config.nicks[to]);
            if(nicks.indexOf(text[2].toLowerCase())>-1) {
                bot.send('KICK',to,text[2]);
            }
        }
    };


}







//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
  var adminTool = new adminTools();
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
          if(messageArray[1].toLowerCase()=='kick' && config.admins.indexOf(from)>-1) {
              adminTool.kick(text, bot, config, to);
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
