const stripIndents = require('common-tags').stripIndents;
const commando = require("discord.js-commando");
const Discord = require("discord.js");
const {Guild, Channel} = Discord;
const winston = require("winston")

module.exports = class SetFormatCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'reset',
			memberName: 'reset',
            description: 'Resets ALL settings back to defaults',
            guildOnly: true,
            group: "welcomer",
            userPermissions: ['MANAGE_SERVER'],
            examples: ['reset']
		});
	}

	async run(msg, args) {
		msg.guild.settings.clear()
		winston.info("Cleared ALL guild settings for guild " + msg.guild.id, { id: msg.guild.id, name: msg.guild.name })
        msg.react("👌")
	}
};
