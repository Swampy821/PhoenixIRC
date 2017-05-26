/*
 * @Author SkySom
 * @Date 1/23/2014
 */
//Message Event
exports.message = function(from, to, text, message, bot, config) {
    if(config.plugins.fuckyeah) {
        var patt = new RegExp("fuck yeah" , "i");
        var res = patt.test(text);
        if(res) {
            var fuckYeahLocation = text.toLowerCase().indexOf("fuck yeah");
            text = text.substr(fuckYeahLocation + "fuck yeah".length, text.length).trim();
            if(text.length > 0) {
                text = encodeURI(text);
                bot.say(to, "http://fuckyeah.herokuapp.com/" + text);
            }
        }
    }
}

