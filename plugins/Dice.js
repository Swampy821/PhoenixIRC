

function theDice() {
	function getDiceInfo(dice) {
		var d = dice.split('d');
		var ret = new Array();
		if(d.length!=2) {
			//Return a d6 becuase clearly they don't know what to roll.
			ret[0]=1;
			ret[1]=6;
		}else{
			ret[0]=d[0];
			ret[1]=d[1];
		}
		return ret;
	}
	this.rollDice = function(dice) {
		if(dice.toLowerCase().indexOf('d')>-1) {
			var rolls = getDiceInfo(dice);
			if(isNaN(rolls[0])==false && isNaN(rolls[1])==false) {
				var dices = rolls[0];
				var faces = rolls[1];
				if(dices > 20) {dices=20;}
				if(dices<1){dices=1;}
				if(faces>20){faces=20;}
				if(faces<4){faces=4;}
				var results = [];
				var total = 0;
				for(i=0;i<dices;i++) {
					var num = Math.floor(Math.random() * faces) + 1;
					total +=num;
					results.push(num);
				}
				var finalResults = results.join(', ');
				finalResults = "rolled "+finalResults;
				if(results.length>1) {
					finalResults += "---------Total: "+total;
				}
				return finalResults;
			}
		}else{
			return false;
		}
	};
}
//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.dice) {
		var txt = text.split(' ');
		if(txt[0].toLowerCase().indexOf(config.botName.toLowerCase())>-1 && txt.length>1) {
			if(txt[1].toLowerCase()=='roll' && txt.length>2) {
				var d = new theDice();
				var results = d.rollDice(txt[2]);
				if(results!=false) {
					bot.action(to, results);
				}
			}
		}
	}
}
