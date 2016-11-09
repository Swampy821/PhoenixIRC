"use strict";
const request = require( "request" );


function el() {

}

el.prototype.getResults = function(bot, to) {
    return new Promise( ( resolve, reject ) => {
        	request( "http://data.cnn.com/ELECTION/2016/bop/p.json", function( error, response, body ) {
                const data = JSON.parse( body );
                let returnString = `The results of the election so far: \n${data.candidates[0].lname} - ${data.candidates[0].cvotes} Votes - ${data.candidates[0].evotes} Electoral Votes ${data.candidates[0].evotes > data.candidates[1].evotes ? " - Leading" : ""}`;
                returnString += `\n${data.candidates[1].lname} - ${data.candidates[1].cvotes} Votes - ${data.candidates[1].evotes} Electoral Votes ${data.candidates[1].evotes > data.candidates[0].evotes ? " - Leading" : ""}`;
                resolve( returnString );
            } );
            
    } );

};


var e = new el();









//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
    var patt = new RegExp(`${config.botName.toLowerCase()}: election|${config.botName.toLowerCase()}: erection`, "gi");
    var res = patt.test(text);
    if(res) {
        e.getResults( bot, to ).then( ( data ) => {
            bot.say( to, data );
        } );
    }
}
