'use strict';

require('dotenv').config();

var DubAPI = require('../index');

new DubAPI({username: process.env.DT_USERNAME, password: process.env.DT_PASSWORD}, function(err, bot) {
    if (err) {
        return console.error(err);
    }

    console.log('Running DubAPI v' + bot.version);

    function connect() {
        bot.connect(process.env.DT_ROOM);
    }

    bot.on('connected', function(name) {
        console.log('Connected to ' + name);
    });

    bot.on('disconnected', function(name) {
        console.log('Disconnected from ' + name);

        setTimeout(connect, 15000);
    });

    bot.on('error', function(err) {
        console.error(err);
    });

    bot.on(bot.events.chatMessage, function(data) {
        console.log(data.user.username + ': ' + data.message);
    });

    connect();
});
