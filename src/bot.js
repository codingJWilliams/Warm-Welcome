const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const winston = require("winston")
const logger = require("./logger")

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
        ["welcomer", "Welcome configuration"]
    ])

    // Registers all built-in groups, commands, and argument types
    .registerDefaults()

    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on("ready", () => winston.info("Client ready"))

client.on("guildMemberAdd", (member) => {
    require("./doWelcome")(member)
})

client.on("commandRun", (command, prom, message) => winston.info(`Command ${command.name} executed with content ${message.content}`, {
    member: message.member.id,
    message: message.id,
    content: message.content,
    command: command.id,
    guild: message.guild.id,
    channel: message.channel.id
}))

client.login(require("../data/config.json").token);