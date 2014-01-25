/**
 * @Author SkySom
 * @Date 1/24/14
 */
var http = require('http');

exports.message = function(from, to, text, message, bot, config) {
    var patt = new RegExp("youtube" , "i");
    var res = patt.test(text);
    if(res) {
        var locationOfYoutube = text.toLowerCase().indexOf("youtube");
        if(locationOfYoutube != -1) {
            var query = text.substr(locationOfYoutube + "youtube".length);
            query = query.trim();
            query = encodeURIComponent(query);
            var options = {
                hostname : "http://gdata.youtube.com",
                path : "/feeds/api/videos?v=2&orderby=relevance&paid-content=false&duration=long&query=" + query
            }
            var req = http.request(options, function(response) {
                bot.say(to, "Making the request");
            });

            req.on('error', function(e) {
                bot.say(to, 'q=' + query + ' error=' + e);
            });

            bot.say(to, "Youtubing " + query);
        }
    }
}
