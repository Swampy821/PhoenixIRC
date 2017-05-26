/**
* Deal with the greets!
**/
function Hello() {
	var helloArray = [
		'hello',
		'Howdy',
		'How\'s it going?',
		'Hi',
		'Hola'
	];
	var lowerHelloArray = new Array();
	for(var i=0; i<helloArray.length-1;i++) {
		lowerHelloArray[i] = helloArray[i].toLowerCase();
	}
	this.getGreet = function() {
		var max = helloArray.length-1;
		var min=0;
		var greetNumber = Math.floor(Math.random() * (max - min + 1) + min);
		return helloArray[greetNumber];
	}
	this.isGreet = function(greet) {
		if(lowerHelloArray.indexOf(greet.toLowerCase())>-1) {
			return true;
		}else{
			return false;
		}
	}
}
var helloWait=false;


//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.greet) {
		var h = new Hello();
		if(h.isGreet(text)==true) {
			if(helloWait==false) {
				helloWait=true;
				var returnMessage = h.getGreet();
				bot.say(to, returnMessage);
				setTimeout(function() {
					helloWait=false;
				},3000);
			}
		}
	}

}
