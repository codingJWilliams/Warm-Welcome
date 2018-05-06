const stripIndents = require('common-tags').stripIndents;
const commando = require("discord.js-commando");
const Discord = require("discord.js");
const {Guild, Channel} = Discord;
const axios = require("axios");
const album = "CgDf3jq"
const winston = require("winston");

module.exports = class SetFormatCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'forcebackground',
			memberName: 'forcebackground',
            description: 'Forces a background change (bot owner only)',
            guildOnly: true,
            ownerOnly: true,
            group: "welcomer",
            args: [
                {
                    key: "bgurl",
                    label: "background",
                    type: "string",
                    prompt: ""
                }
            ]
		});
	}

	async run(msg, args) {
        msg.guild.settings.set("bg", args.bgurl)
        winston.info("Set background to " + args.bgurl + " for guild " + msg.guild.id + ".")
        msg.channel.send(new Discord.RichEmbed().setTitle("Background Changed").setColor(0x5f42f4).setDescription("I set the welcome background to this:").setImage(args.bgurl))
        msg.react("👌")
	}
};
