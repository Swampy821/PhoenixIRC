
const log = require('./../../../libs/log');


module.exports = class LogPlugin {
    static getName() {
        return 'log';
    }

    static getWeight() {
        //This HAS to be first as it will hopefully be used in all
        //  future plugins.
        return 2000;
    }
    
    static register(config) {
        log.init = this.prototype.init.bind(this);
        //This is a good example of using a 3rd party library as a plugin.
        return log;
    }

    init(options) {
        return Promise.resolve();
    }
};