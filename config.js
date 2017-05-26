/*-----------------BOT CONFIG-----------------*/
exports.channels = ['#pcon', '#ihatebitches', '#penguicon'];

exports.server =  "irc.freenode.net";

exports.botName = "lilwidgitty";

exports.userName = 'lilwidgitty';

exports.realName = 'lilwidgitty';

exports.admins = ['Zimdale'];

exports.nicks = Array();

exports.autoOp=true;

exports.autoOpChannels = ['##phoenixirc'];

exports.plugins = {
	"admin": false,
	"adult": false,
    "anagram": false,
    "ass": false,
	"beer": false,
	"bitcoin": false,
	"define": false,
	"dice": false,
	"fml": false,
	"fuckyeah": false,
	"goodbyes": false,
	"google": false,
	"greets": false,
	"jokes": false,
	"liar": false,
	"quotes":false,
	"towel": false,
	"youtube": false,
    "porn":false,
    "sammich":false,
    "translate":false,
    "attack":false,
    "calm":false,
    "unoStop":false,
    "wootOff":{
    	apiUrl: 'http://api.woot.com/2/events/fa4a597f-8be0-48b4-8f35-ba0c0989e727.json?key={GET KEY API FROM WOOT}',
    	active:false
    },
    "decide":false,
    "catfact":false,
    "weather":false,
    "zoidburg":false,
    "chan":false,
    "trivia":false,
    "excuse":false,
    "xkcd":false,
    "seen":false,
    "bible":false,
    "wa":false,
    "waID":"-----",
    "wiki": false,
    "giffy": false,
    "gur": false, //PLACE API KEY HERE.
    "finance": false
};

exports.blacklist = [];
