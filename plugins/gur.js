var request = require('request');





var $ = require("jquery-deferred");

//Message Event
exports.message = function(from, to, text, message, bot, config) {
    if(config.plugins.gur) {
        var Imgur = require("imgur-search");
        var gur = new Imgur(config.plugins.gur);
        var patt = new RegExp("!gur" , "i");
        var res = patt.test(text);
        if(res) {
            var fuckYeahLocation = text.toLowerCase().indexOf("!gur");
            text = text.substr(fuckYeahLocation + "!gur".length, text.length).trim();
            if(text.length > 0) {
                try{
                    
                gur.search(text).always(function(resp) {
                   bot.say(to, from + ": " + resp[0].link); 
                });
                
                }catch(e) {
                    bot.say(to, "Sorry an error has occurred, try again.")
                }
            }
        }
    }
}

