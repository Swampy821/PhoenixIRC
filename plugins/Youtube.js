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
                hostname : "gdata.youtube.com",
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
                        console.log(js.length);
                        if(js.length>0) {
                            bot.say(to, "The length of js is " + js.length);
                        }else{
                            bot.say(to, "There is nothing");
                        }
                    }catch(e) {
                        bot.say(to, "Error " + e);
                    }
                });
                resp.on('err', function(e) {
                   bot.say(to, e);
                });
            });

            bot.say(to, "Youtubing " + query);
        }
    }
}
