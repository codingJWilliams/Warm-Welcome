const stripIndents = require('common-tags').stripIndents;
const commando = require("discord.js-commando");
const Discord = require("discord.js");
const {Guild, Channel} = Discord;
var AWS = require('aws-sdk');
AWS.config.loadFromPath("../data/aws.json") // Schema: {"accessKeyId": "key", "secretAccessKey": "", "region": "us-east-1"} 
var lambda = new AWS.Lambda();

/**
 * @param {Guild} guild The guild to find the default channel of
 * @returns {Channel}
 */
function determineDefaultChannel(guild) {
    if (guild.channels.find("name", "welcome")) return guild.channels.find("name", "welcome")
    if (guild.channels.find("name", "general")) return guild.channels.find("name", "general")
    return guild.channels.first()
}

module.exports = class UserInfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'test-welcome',
			group: 'welcome',
			memberName: 'test-welcome',
			description: 'Welcomes you!',
			guildOnly: true
		});
	}

	async run(msg, args) {
        var memberToWelcome = msg.member;
        var channel = memberToWelcome.guild.settings.get("channel", null)
        if (channel) channel = memberToWelcome.guild.channels.get(channel)
        if (!channel) channel = determineDefaultChannel(memberToWelcome.guild)
        var params = {
            FunctionName: "warmwelcome-dev-hello",
            Payload: JSON.stringify({
            queryStringParameters: {
                name: memberToWelcome.user.username,
                avatar: memberToWelcome.user.displayAvatarURL.replace("size=2048", "size=128"),
                guild: memberToWelcome.guild.settings.get("guildname", memberToWelcome.guild.name),
                background: "https://s3.amazonaws.com/random-stuff-voidcrafted/retro-game-background-For-Free-Wallpaper.jpg"
            }
            })
        }
        lambda.invoke(params, (err, payload) => {
            if (err) return console.error(err)
            var pl = JSON.parse(payload.Payload);
            if (pl.error) return channel.send(pl.errorMsg);
            var imageBuffer = Buffer.from(pl.body, "base64");
            var at = new Discord.Attachment(imageBuffer, "welcome.png");
            channel.send(
                memberToWelcome.guild.settings.get("format", "Welcome %person% to %guild%!")
                    .replace(/%person%/g, `<@${memberToWelcome.id}>`)
                    .replace(/%guild%/g, memberToWelcome.guild.settings.get("guildname", memberToWelcome.guild.name)), at)
        })
	}
};