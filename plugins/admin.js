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
    

    this.voice = function(bot, config, text, to) {
	text = text.split(' ');
	if(text.length>2) {
		var nicks = lCaseNicks(config.nicks[to]);
		if(nicks.indexOf(text[2].toLowerCase())>-1) {
			   bot.send('MODE',to,'+v',text[2]);
		}
	}

    }
    
    this.deVoice = function(bot, config, text, to) {
	text = text.split(' ');
	if(text.length>2) {
		var nicks = lCaseNicks(config.nicks[to]);
		if(nicks.indexOf(text[2].toLowerCase())>-1) {
			bot.send('Mode',to,'-v',text[2]);
		}
	}
    }

    this.ban = function(bot, config, text, to) {
	text = text.split(' ');
	if(text.length>2) {
		var nicks = lCaseNicks(config.nicks[to]);
		if(nicks.indexOf(text[2].toLowerCase())>-1) {
			bot.send('MODE',to,'+b',text[2]);
		}
	}
    }

   
    this.unBan = function(bot, config, text, to) {
    	text = text.split(' ');
    	if(text.length>2) {
    		bot.send('MODE',to,'-b',text[2]);
    	}
    }

    this.hear = function(messageArray, config, to, whatToHear) {
        if(messageArray[1].toLowerCase()==whatToHear.toLowerCase() && config.autoOpChannels.indexOf(to.toLowerCase())>-1) {
            return true;
        }else{
            return false;
        }
    }

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
          if(adminTool.hear(messageArray,config,to,'die')) {
               process.exit();
          }
          if(adminTool.hear(messageArray,config,to,'kick')) {
              adminTool.kick(text, bot, config, to);
          }
        	if(adminTool.hear(messageArray,config,to,'voice')) {
        	   adminTool.voice(bot,config,text,to);
        	}
        	if(adminTool.hear(messageArray,config,to,'devoice')) {
        	   adminTool.deVoice(bot,config,text,to);
        	}
        	if(adminTool.hear(messageArray,config,to,'ban')) {
        	   adminTool.ban(bot,config,text,to);
        	}
        	if(adminTool.hear(messageArray,config,to,'unban')) {
        	   adminTool.unBan(bot,config,text,to);
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
