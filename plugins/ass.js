/*
 * @Author: 5thWall
 * @Date: 7/27/2014
 */
exports.message = function(from, to, text, message, bot, config) {
  function canSay(assConf) {
    if(typeof(assConf) === "object" && assConf.frequency) {
      return (Math.floor(Math.random() * (assConf.frequency - 1)) + 1) == 1;
    }

    return true;
  }

  if(config.plugins.ass) {
    var reg = /-(ass)\s/gi;
    if(reg.test(text) && canSay(config.plugins.ass)) {
      text = text.replace(reg, " $1-");
      bot.say(to, text);
    }
  }
}
