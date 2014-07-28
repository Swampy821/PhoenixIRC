/*
 * @Author: 5thWall
 * @Date: 7/27/2014
 */
exports.message = function(from, to, text, message, bot, config) {
  if(config.plugins.ass) {
    var reg = /(\w+)-ass\s(\w+)/gi;
    if(reg.test(text)) {
      text = text.replace(reg, "$1 ass-$2");
      bot.say(to, text);
    }
  }
}
