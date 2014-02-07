/**
 * Created by Skylar on 1/24/14.
 */

exports.message = function(from, to, text, message, bot, config) {
    var patt = new RegExp("\byou lie\b|\byou('re|r) lying\b|\bdon't believe you\b|\bliar\b|\blies\b" , "i");
    var res = patt.test(text);
    if(res) {
        bot.say(to, "http://i.imgur.com/XvUsaD9.jpg");
    }
}
