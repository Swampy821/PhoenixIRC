
module.exports = class ExampleIRCPlugin  {
    
    static getName() {
        return 'exampleircplugin';
    }

    static getWeight() {
        return 1000;
    }
    
    static register(config) {
        return new ExampleIRCPlugin(config);
    }

    init(options) {
        this.irc = options.plugins.get('irc');
        this.log = options.plugins.get('log');


        this.irc.onMessage('#phoebot2', message => {
            const channel = this.irc.getChannel('#phoebot2');

            if(message.message === 'hello') {
                this.log.debug('Saying hello there');
                channel.say('Hello there');
            }
        });

        




        return Promise.resolve();
    }
};