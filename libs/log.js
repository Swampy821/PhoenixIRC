/**
 * This is only in a lib instead of a plugin because
 *   it is used inside hte pluginLoader. In all other 
 *   cases this should be used in a plugin and should
 *   always be used as a plugin in other plugins
 */

const Log = require('log');
const log = new Log(process.env.LOG_LEVEL || 'debug');

module.exports = log;