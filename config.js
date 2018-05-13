module.exports = {
    EXPRESS_PORT: process.env.EXPRESS_PORT || 3000,
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    IRC_HOST: 'chat.freenode.net',
    NICK: 'Phoebot3',
    CHANNELS: [
        '#phoebot2'
    ]
};