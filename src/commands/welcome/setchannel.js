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
			group: 'welcome',
			memberName: 'setchannel',
			description: 'Sets the channel which welcomes will be sent to',
      guildOnly: true,
      userPermissions: ['MANAGE_SERVER'],
      examples: ['setchannel #general', 'setchannel #newpeople'],
      args: [
        {
          type: "channel",
          key: "channel",
          label: "channel",
          prompt: "Which channel do you want welcome messages to go to?"
        }
      ]
		});
	}

	async run(msg, args) {
    msg.guild.settings.set("channel", args.channel.id)
    msg.react("👌")
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