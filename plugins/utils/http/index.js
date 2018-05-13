const express = require('express');
const http = require('http');
var bodyParser = require('body-parser');
let log;

module.exports = class Http  {
    
    static getName() {
        return 'http';
    }

    static getWeight() {
        return 50;
    }
    
    static register(config) {
        return new Http(config);
    }

    init(options) {
        this.config = options.config;
        this.plugins = options.plugins;
        log = this.plugins.get('log');
        
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.http = http.Server(this.app);
        this.get = this.app.get.bind(this.app);
        this.post = this.app.post.bind(this.app);
        this.put = this.app.put.bind(this.app);
        this.all = this.app.all.bind(this.app);
        
        return Promise.resolve();
    }


    registerStaticDirectory(dir) {
        log.info(`HTTP PLUGIN:: Adding static directory ${dir}`)
        this.app.use('/', express.static(dir));
    }


    listen() {
        return new Promise(resolve => {
            this.http.listen(this.config.EXPRESS_PORT, () => {
                log.info(`Started listening on port ${this.config.EXPRESS_PORT}`);
                resolve();
            });
        });
    }
};