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
			name: 'setbackground',
			memberName: 'setbackground',
            description: 'Sets the background to an option from .backgrounds',
            guildOnly: true,
            group: "welcomer",
            userPermissions: ['MANAGE_SERVER'],
            examples: ['setbackground 7'],
            args: [
                {
                    key: "bgid",
                    label: "background",
                    default: 1,
                    type: "integer",
                    prompt: ""
                }
            ]
		});
	}

	async run(msg, args) {
        var resp = await axios.get("https://api.imgur.com/3/album/" + album + "/images", {
            headers: { "Authorization": "Client-ID " + require("../../../data/config.json").imgurID }
        })
        var viable = resp.data.data.filter(d => d.description.split(" ")[1] == args.bgid)
        if (viable.length < 1) return winston.info("Background set failed", { message: msg.content, executor: msg.author.id, guild: msg.guild.id }) && msg.react("🚫") && msg.channel.send("I couldn't find that background. Try running `" + msg.guild.settings.get("prefix", ".") + "backgrounds`");
        var bg = viable[0].link
        msg.guild.settings.set("bg", bg)
        winston.info("Set background to " + bg + " for guild " + msg.guild.id + ".")
        msg.channel.send(new Discord.RichEmbed().setTitle("Background Changed").setColor(0x5f42f4).setDescription("I set the welcome background to this:").setImage(bg))
        msg.react("👌")
	}
};
