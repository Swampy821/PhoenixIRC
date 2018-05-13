
const expires = require('expires');

module.exports = class Expires{
    
    static getName() {
        return 'expires';
    }

    static getWeight() {
        return 0;
    }
    
    static register(config) {
        expires.init = this.prototype.init.bind(this);
        return expires;
    }

    init(options) {
        return Promise.resolve();
    }
};