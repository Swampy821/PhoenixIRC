const IRCFramework = require('irc-framework');

module.exports = class IRC{
    constructor() {
        this._messageHandlers = [];
    }
    static getName() {
        return 'irc';
    }

    static getWeight() {
        return 1000;
    }
    
    static register(config) {
        return new IRC(config);
    }

    init(options) {
        
        this.log = options.plugins.get('log');
        const config = options.config;
        this.channels = config.CHANNELS;
        this.bot = new IRCFramework.Client();
        
        this.bot.connect({
            host: config.IRC_HOST,
            nick: config.NICK,
            port: 6667
        });

        this._handleMessages();
    

        this.log.info(`IRC PLUGIN:: Connecting to irc host ${config.IRC_HOST}`);
        return new Promise(resolve => {
            this.bot.on('registered', () => {
                this.log.info(`IRC PLUGIN:: Successfully connected to ${config.IRC_HOST}`);
                this._joinChannels();
            })
            resolve();
        });
    }


    onMessage(channel, handler) {
        this._messageHandlers.push({channel, handler});
    }


    getChannel(channel) {
        return this.bot.channel(channel);
    }





    _joinChannels() {
        this.channels.forEach(channel => {
            this.log.info(`IRC PLUGIN:: Joining channel ${channel}`)
            this.bot.join(channel);
        })
    }

    _handleMessages() {
        this.bot.on('message', message => {
            this._messageHandlers.forEach(mh => {
                if (message.type === 'privmsg' && message.target === mh.channel) {
                    mh.handler(message);
                }
            })
        })
    }



};