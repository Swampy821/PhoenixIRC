/**
 * Created by Skylar on 1/24/14.
 */

exports.message = function(from, to, text, message, bot, config) {
    var patt = new RegExp("you lie|you('re|r) lying|don't believe you|liar|lies" , "i");
    var res = patt.test(text);
    if(res) {
        bot.say(to, "http://i.imgur.com/XvUsaD9.jpg");
    }
}
