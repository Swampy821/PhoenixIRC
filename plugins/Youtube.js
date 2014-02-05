/**
 * @Author SkySom
 * @Date 1/24/14
 */


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
                path : "/feeds/api/videos?v=2&orderby=relevance&paid-content=false&alt=jsonc&duration=long&query=" + query
            }
            console.log(options.hostname + options.path);
            var chk = '';
            var http = require('http');
            http.get(options, function(resp){
                resp.setEncoding('utf8');
                resp.on('data', function(chunk){
                    chk+=chunk;
                });
                resp.on('end',function() {
                    try{
                        js = JSON.parse(chk);
                        if(js.length>0) {
                            bot.say(to, from+': '+js[0].text);
                        }else{
                            bot.say(to, from+': I do not have a definition for that word');
                        }
                    }catch(e) {
                        bot.say(to, from+': Invalid character');
                    }
                });
                resp.on('err', function(e) {
                   bot.say(to, e);
                });
            });

            var req = http.request(options, function(response) {
                bot.say(to, "Making the request");
            });

            req.on('data', function(chunk) {
               bot.say(to, "Recieving data");
            });

            req.on('error', function(e) {
                bot.say(to, 'q=' + query + e);
            });

            bot.say(to, "Youtubing " + query);
        }
    }
}
