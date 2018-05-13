//Just run in the plugin loader.
const PluginLoader = require('./libs/PluginLoader');
const plugins = require('./plugins.json');
const log = require('./libs/log');
const config = require('./config');


const pluginLoader = new PluginLoader({plugins});
pluginLoader.init({config}).then(options => {
    log.info('System started successfully!');
})
.catch(err => {
    log.critical(err);
})


