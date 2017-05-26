var http = require('http');

var irc = null;
var pornConfig = {
	redditmulti: "/user/m/multiname",
	channels: [ "##phoebtest" ],
	interval: 1800000
};

var timer = null;
var last_sub = "";

exports.init = function(bot, config) {
        if(pornConfig.redditmulti==="/user/m/multiname" || config.plugins.porn===false) {
            return;
        }
	irc = bot;
	timer = setInterval(postPorn, pornConfig.interval);
}

var postPorn = function () {
	var porn = {
		title: "",
		link: "",
		rlink: "",
		subreddit: "",
		author: ""
	};

	getSubreddit(function (sub) {
		porn.subreddit = sub;

		getTopPost(porn.subreddit, function (post) {
			porn.title = post.title;
			porn.link = post.url;
			porn.rlink = "http://reddit.com" + post.permalink;
			porn.author = post.author;

			for (var i = 0; i < pornConfig.channels.length; i++) {
				irc.say(pornConfig.channels[i], "[" + porn.subreddit + "] " + porn.title + ": " + porn.link);
			}
		});
	});
}

var getSubreddit = function (callback) {
	var buffer = "";

    http.get("http://www.reddit.com/api/multi/user" + pornConfig.redditmulti, function(res) {
        res.setEncoding('utf8');

        res.on('data', function(chunk){
            buffer += chunk;
        });

        res.on('end',function() {
            try {
                var json = JSON.parse(buffer);
				var subs = [];

				for (var i = 0; i < json.data.subreddits.length; i++) {
					subs.push(json.data.subreddits[i].name);
				}

				var sub = "";
				while (sub == last_sub) {
					sub = subs[Math.floor(Math.random() * subs.length)];
				}

				last_sub = sub;
				callback(sub);
            } catch(e) {
                console.log("Error while parsing porn: " + e);
            }
        });

        res.on('err', function(e) {
            console.log("Couldn't get porn: " + e);
        });
    });
}

var getTopPost = function (subreddit, callback) {
	var buffer = "";

    http.get("http://www.reddit.com/r/" + subreddit + "/top.json", function(res) {
        res.setEncoding('utf8');

        res.on('data', function(chunk){
            buffer += chunk;
        });

        res.on('end',function() {
            try {
                var json = JSON.parse(buffer);
				var posts = [];

				for (var i = 0; i < json.data.children.length; i++) {
					posts.push(json.data.children[i].data);
				}

				var post = posts[Math.floor(Math.random() * posts.length)];
				callback(post);
            } catch(e) {
                console.log("Error while parsing porn: " + e);
            }
        });

        res.on('err', function(e) {
            console.log("Couldn't get porn: " + e);
        });
    });
}

