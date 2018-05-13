
const redis = require('redis');
let log;

module.exports = class RedisPlugin {
    
    static getName() {
        return 'redis';
    }

    static getWeight() {
        return 1;
    }
    
    static register(config) {
        return new RedisPlugin(config);
    }

    init(options) {
        //Load log plugin
        log = options.plugins.get('log');

        this.redis = options.redis || redis; // For Testing

        this.config = options.config;
        log.debug(`REDISPLUGIN:: Itializing redis client on host ${this.config.REDIS_HOST}`);
        this.client = this.redis.createClient({
            host: this.config.REDIS_HOST,
            port: this.config.REDIS_PORT
        });

        return new Promise((resolve, reject) => {
            this.client.on('error', err => {
                log.critical(`REDISPLUGIN:: Redis failed to connected ${err}`);
                process.exit(1);
                reject(err);
            })

            this.client.on('ready', () => {
                log.debug(`REDISPLUGIN:: Redis connected successfully`);
                resolve();
            })
        });
    }



    set(key, val, ttl = false) {
        log.debug(`REDISPLUGIN:: Setting redis key ${key}`);
        return new Promise(resolve => {
            if(ttl) {
                ttl = ttl / 1000;
                this.client.set(key, val, 'EX', ttl, e => {
                    resolve(e);
                });
            }else{
                this.client.set(key, val, e => {
                    resolve(e);
                });
            }
        });
    }

    get(key) {
        log.debug(`REDISPLUGIN:: Getting redis key ${key}`);
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, data) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }


};