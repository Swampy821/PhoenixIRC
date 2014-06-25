var beer = require('../plugins/Beer.js');

describe('The Beer plugin', function() {
	describe('The message function', function(){
		var bot = {
	        say: function(){}
        };
        var config = {
            plugins:{
                beer:true
            }
        };
		beforeEach(function(){
		    spyOn(bot,'say');
	 	});

		it('should call the bot.say function when beer is said', function() {
            beer.message('a','a','beer','beer',bot,config);
            expect(bot.say).toHaveBeenCalled();     
        });

		it('should not call bot.say function if config.plugins.beer is not set', function() {
			config.plugins.beer = false;
			beer.message('a','a','beer','beer',bot,config);
			expect(bot.say).not.toHaveBeenCalled();
		});

		it('should not call bot.say function if beer is not mentioned', function() {
			config.plugins.beer = true;
			beer.message('a','a','a','a',bot,config);
			expect(bot.say).not.toHaveBeenCalled();
		});



	})
})