/*
 * @Author Corey Matyas (@coreymatyas)
 * @Date 2/11/2014
 */

var http = require("http");

// MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.bitcoin) {
		var validationPattern = new RegExp("bitcoin price" , "gi");

		if (validationPattern.test(text)) { // If "bitcoin price" is anywhere in the message
			var request = http.request({ // Make a request to the Bitcoin Charts API
				host: "api.bitcoincharts.com",
				port: 80,
				path: "/v1/weighted_prices.json",
				method: "GET"
			}, function(response) {
				var output = "";

				response.on("data", function (chunk) {
					output += chunk;
				});

				response.on("end", function() { // Send price to IRC
					var btcData = JSON.parse(output);
					bot.say(to, "--Bitcoin-- 24hr Weighted Price: " + btcData.USD["24h"]);
				});
			});

			request.on("error", function(error) { // Error if request could not be made
				bot.say(to, "--Bitcoin-- Could not currently retrieve price data.");
			});

			request.end();
		}
	}
}