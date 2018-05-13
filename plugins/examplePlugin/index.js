
// BasePlugin is only required if you don't plan on overriding all methods. 
// All plugin tools are injected via options on init.
const BasePlugin = require('./../../libs/BasePlugin');

module.exports = class ExamplePlugin extends BasePlugin {
    
    static getName() {
        return 'ExamplePlugin';
    }

    static getWeight() {
        return 1000;
    }
    
    static register(config) {
        return new ExamplePlugin(config);
    }

    init(options) {

        return Promise.resolve();
    }
};