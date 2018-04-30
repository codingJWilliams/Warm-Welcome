const stripIndents = require('common-tags').stripIndents;
const commando = require("discord.js-commando");
const Discord = require("discord.js");
const {Guild, Channel} = Discord;

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
			name: 'setchannel',
			memberName: 'setchannel',
			description: 'Sets the channel which welcomes will be sent to. Leave channel blank to set to default',
      guildOnly: true,
      group: "welcomer",
      userPermissions: ['MANAGE_SERVER'],
      examples: ['setchannel #general', 'setchannel #newpeople', 'setchannel'],
      args: [
        {
          type: "channel",
          key: "channel",
          label: "channel",
          default: "",
          prompt: ''
        }
      ]
		});
	}

	async run(msg, args) {
    var ch = args.channel;
    if(!ch) ch = determineDefaultChannel(msg.guild)
    msg.guild.settings.set("channel", ch.id)
    await msg.react("👌")
    await msg.channel.send(new Discord.RichEmbed().setTitle("Available Backgrounds").setColor(0x5f42f4).setDescription("I will welcome new members in " + ch))
	}
};


/*

var AWS = require('aws-sdk');

var lambda = new AWS.Lambda();
const Discord = require("discord.js");

module.exports = (member) => {

  var channel = member.guild.defaultChannel;
  var params = {
    FunctionName: "LambdaWelcome-dev-hello",
    Payload: JSON.stringify({
      queryStringParameters: {
        name: member.user.username,
        avatar: member.user.displayAvatarURL.replace("size=2048", "size=128"),
        guild: member.guild.name
      }
    })
  }
  lambda.invoke(params, (err, payload) => {
    if (err) return console.error(err)
    var bu = Buffer.from(JSON.parse(payload.Payload)
      .body, "base64");
    
    var at = new Discord.Attachment(bu, "welcome.jpg");
    channel.send("Welcome <@" + member.id + "> to Nightborn :heart:", at)
  })
}


 */