const log = require('./log');
const seq = require('./seq.js');

module.exports = class PluginLoader {
    constructor({plugins, config}) {
        plugins = plugins || [];  
        plugins = this._validateAndLoadPlugins(plugins); 
        plugins = this._sortPlugins(plugins);  
        const pluginComp = this._buildPluginsObject({plugins, config});
        log.info('plugins loaded successfully');
        this.plugins = pluginComp.pluginObject;
        this.pluginArray = pluginComp.pluginArray;

    }

    init(config) {
        config = config || {}
        config = Object.assign({}, config, {plugins: {
            get: this._getPlugin.bind(this)
        }});
        return this._loadPlugins({plugins: this.pluginArray, config});
    }

    _validateAndLoadPlugins(plugins) {
        log.debug('Validating plugins');
        let error = false;

        const pluginMap = plugins.map(plugin => {
            const p = require(`./../plugins/${plugin}/index`);
            if(this._validatePlugin(p, plugin)) {
                error =true;
            }
            return p;
        });

        if(error) {
            log.critical('Ending program due to validation issue.');
            process.exit(1);
        }

        return pluginMap;
    }

    _validatePlugin(plugin, location) {
        let error = false;
        log.debug(`Validating plugin ${location}`);
        if(typeof plugin.register !== 'function') {
            log.error(`Register method must be a function on plugins. ${location}`);
            error = true;
        }
        if(typeof plugin.getName !== 'function') {
            log.error(`getName method must be a function on plugins. ${location}`);
            error = true;
        }
        if(typeof plugin.getWeight !== 'function') {
            log.error(`getWeight method must be a function on plugins. ${location}`);
            error = true;
        }

        if(typeof plugin.getName() !== 'string') {
            log.error(`Plugin name must be a string ${location}`);
            error = true;
        }

        if(typeof plugin.getWeight() !== 'number') {
            log.error(`Plugin weight must be a number ${location}`);
            error = true;
        }

        if(!error) {
            log.debug(`Plugin ${location} valid`);
        }

        return error;
    }

    _sortPlugins(plugins) {
        log.debug('Sorting plugins');

        return plugins.sort((a, b) => {
            return a.getWeight() > b.getWeight();
        });
    }

    _buildPluginsObject({plugins, config}) {
        log.debug('Building plugin objects');
        let pluginObject = {};

        plugins = plugins.map(p => {
            const name = p.getName();
            const plug = p.register(config);
            pluginObject[name] = plug;
            return plug;
        });

        return {pluginObject, pluginArray: plugins};
    }




    _loadPlugins({plugins, config}) {
        log.debug('Initializing plugins');
        return new Promise((resolve, reject) => {
            seq(plugins.map((p) => {
                return p.init.bind(p);
            }), {
                options: config
            }).then(() => {
                resolve({plugins, config});
            })
            .catch(err => {
                reject(err);
            })
        })
        
    }

    _getPlugin(name, notCritical=false) {
        if(this.plugins[name]) {
            return this.plugins[name];
        }else{
            if(!notCritical) {
                log.critical(`Critical plugin ${name} not found and attempted to initialize`);
                process.exit(1);
            }

            log.debug(`Plugin ${name} not found but is marked as not critical so returning false`);
            return false;
        }
    }

}