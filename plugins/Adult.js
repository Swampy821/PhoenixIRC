adultImageArray = [
  "http://1.bp.blogspot.com/_D_Z-D2tzi14/TBpOnhVqyAI/AAAAAAAADFU/8tfM4E_Z4pU/s400/responsibility12(alternate).png",
  "http://2.bp.blogspot.com/_D_Z-D2tzi14/TBpOglLvLgI/AAAAAAAADFM/I7_IUXh6v1I/s400/responsibility10.png",
  "http://4.bp.blogspot.com/_D_Z-D2tzi14/TBpOY-GY8TI/AAAAAAAADFE/eboe6ItMldg/s400/responsibility11.png",
  "http://2.bp.blogspot.com/_D_Z-D2tzi14/TBpOOgiDnVI/AAAAAAAADE8/wLkmIIv-xiY/s400/responsibility13(alternate).png",
  "http://3.bp.blogspot.com/_D_Z-D2tzi14/TBpa3lAAFQI/AAAAAAAADFs/8IVZ-jzQsLU/s400/responsibility14.png",
  "http://3.bp.blogspot.com/_D_Z-D2tzi14/TBpoOlpMa_I/AAAAAAAADGU/CfZVMM9MqsU/s400/responsibility102.png",
  "http://4.bp.blogspot.com/_D_Z-D2tzi14/TBpoVLLDgCI/AAAAAAAADGc/iqux8px_V-s/s400/responsibility12(alternate)2.png",
  "http://2.bp.blogspot.com/_D_Z-D2tzi14/TBpqGvZ7jVI/AAAAAAAADGk/hDTNttRLLks/s400/responsibility8.png"
]

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
 	if(config.plugins.adult && text.toLowerCase().indexOf('like an adult')>-1) {
 		 var Indx =  Math.floor(Math.random() * (adultImageArray.length-1));
 		 bot.say(to, adultImageArray[Indx]);

 	}
}