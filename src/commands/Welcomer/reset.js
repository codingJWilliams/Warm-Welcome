const stripIndents = require('common-tags').stripIndents;
const commando = require("discord.js-commando");
const Discord = require("discord.js");
const {Guild, Channel} = Discord;

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
        msg.react("👌")
	}
};
