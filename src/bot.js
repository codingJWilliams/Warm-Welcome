const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');


const client = new Commando.Client({
    owner: '193053876692189184',
    commandPrefix: ".",
    unknownCommandResponse: false
});

client.setProvider(
    sqlite.open(path.join(__dirname, '..', 'data', 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.registry
    // Registers command groups
    .registerGroups([
        ["welcome", "Commands to welcome users to the server"]
    ])

    // Registers all built-in groups, commands, and argument types
    .registerDefaults()

    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(require("../data/config.json").token);