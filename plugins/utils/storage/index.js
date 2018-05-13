let localStorage = {};
let log;
module.exports = class StoragePlugin {
    
    static getName() {
        return 'storage';
    }

    static getWeight() {
        return 2270;
    }
    
    static register(config) {
        return new StoragePlugin(config);
    }

    init(options) {
        this.redis = options.plugins.get('redis', true);
        log = options.plugins.get('log');
        this.config = options.config;
        this.plugins = options.plugins;
        return Promise.resolve();
    }


    get(key) {
        const expires = this.plugins.get('expires');
        log.debug(`STORAGE PLUGIN:: Getting key ${key}`);
        return new Promise((resolve, reject) => {
            const localData = localStorage[key];
            if(localData) {
                if(!localData.timestamp || (localData.timestamp && !expires.expired(localData.timestamp))) {
                    log.debug(`STORAGE PLUGIN:: Successfully got key ${key} from local`);
                    resolve(localData.data);
                }
                return;
            }
            if(this.config.STORAGE_USE_REDIS) {
                this.redis.get(key).then(data => {
                    log.debug(`STORAGE PLUGIN:: Successfully got key ${key} from redis`);
                    if(data) {
                        resolve(data);
                    }else{
                        reject(null);
                    }
                })
                .catch(err => {
                    log.debug(`STORAGE PLUGIN:: Failed to get key ${key} from redis ${err}`);
                    reject(err);
                });
            }else{
                reject();
            }
        });
    }

    set(key, value, ttl=false) {
        const expires = this.plugins.get('expires');
        return new Promise(resolve => {
            if(typeof value === 'object' || typeof value === 'array') {
                value = JSON.stringify(value);
            }
            localStorage[key] = {data: value};
            if(ttl) {
                localStorage[key].timestamp = expires.after(ttl);
            }
            log.debug(`STORAGE PLUGIN:: Wrote key ${key} to local successfully. Size: ${Object.keys(localStorage).length}`);
            if(this.config.STORAGE_USE_REDIS) {
                this.redis.set(key, value).then(() => {
                    log.debug(`STORAGE PLUGIN:: Wrote key ${key} to redis successfully`);
                    resolve();
                });
            }else{
                resolve();
            }
        });
        
    }
};