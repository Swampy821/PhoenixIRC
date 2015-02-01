var req = require("request");

exports.message = function(from, to, text, message, bot, config) {
	var trigger = "!wiki ";
	if (config.plugins.wiki 
		&& text.toLowerCase().indexOf(trigger.toLowerCase()) === 0) {
		text = text.split(' ')
		var apicall = "http://en.wikipedia.org/w/api.php?format=json"
						+ "&action=query" // return info about page
						+ "&titles="+encodeURI(text.splice(1).join(" ")) // with this encoded title
						+ "&prop=extracts|info" // format should contain minimal formatting
						+ "&exchars=200" // max characters returned
						+ "&explaintext" // plaintext only, no formatting
						+ "&inprop=url" // include the url in the info
						+ "&redirects"; // follow redirects
		req(apicall, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					body = JSON.parse(body);
					var pages = body["query"]["pages"];
					if ("-1" in pages) {
						bot.say(to, from+": No page found.");
					}
					else {
						var sentence = /(\w.+?\.(\s|\"))/
						for (page in pages) {
							var pageText = pages[page]["extract"];
							var matches = sentence.exec(pageText);
							if (matches) {
								bot.say(to, from+": "+matches[1]);
								bot.say(to, pages[page]["fullurl"])
							}
							else {
								bot.say(to, from+": "+pages[page]["fullurl"]);
							}
						}
					}
				}
				else {
					bot.say(to, from+": Error retrieving article.");
				}
			})
	}
}