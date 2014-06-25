var adult = require('./Adult.js');

describe('The Adult plugin for PhoenixIRC',function() {
    describe('The message function', function() {
        var bot = {
	    say: function(){}
        };
        var config = {
            plugins:{
                adult:true
            }
        };
	beforeEach(function(){
	    spyOn(bot,'say');
 	});
        it('should call the bot.say function', function() {
            adult.message('a','a','like an adult','like an adult',bot,config);
            expect(bot.say).toHaveBeenCalled();     
        });
        it('should not call bot.say if text does not say like an adult', function() {
            adult.message('a','a','a','a',bot,config);
            expect(bot.say).not.toHaveBeenCalled();
        });
	it('should not run if config.plugins.adult = false', function() {
            config.plugins.adult = false;
            adult.message('a','a','like an adult','like an adult',bot,config);
            expect(bot.say).not.toHaveBeenCalled();
        });
    });
});
