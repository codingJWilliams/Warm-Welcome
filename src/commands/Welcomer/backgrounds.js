const stripIndents = require('common-tags').stripIndents;
const commando = require("discord.js-commando");
const Discord = require("discord.js");
const {Guild, Channel} = Discord;
const axios = require("axios");
const album = "CgDf3jq"
const winston = require("winston")

module.exports = class SetFormatCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'backgrounds',
			memberName: 'backgrounds',
            description: 'Lists available background images along with their IDs',
            guildOnly: true,
            group: "welcomer",
            userPermissions: ['MANAGE_SERVER'],
            examples: ['images']
		});
	}

	async run(msg, args) {
        
        msg.channel.send(new Discord.RichEmbed().setTitle("Available Backgrounds").setColor(0x5f42f4).setDescription("You can see all of the available backgrounds in [this imgur album](https://imgur.com/a/" + album + "). Use the command in each image's description to choose that one. We're 100% happy to add your backgrounds in, but for technical reasons we cannot make a command for this. Feel free to ask in the support server."))
	}
};
