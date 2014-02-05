//Bot Manager

var forever = require('forever-monitor');

var child = new (forever.Monitor)('bot.js', {
    max: 3,
    silent: true,
	options: []
});

child.on('exit', function () {
	console.log('bot.js has exited after 3 restarts');
});

child.start();