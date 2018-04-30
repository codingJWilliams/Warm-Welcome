const stripIndents = require('common-tags').stripIndents;
const commando = require("discord.js-commando");
const Discord = require("discord.js");
const {Guild, Channel} = Discord;

module.exports = class SetFormatCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'setguild',
			memberName: 'setguild',
      description: 'Sets the guild\'s name in the welcome image',
      guildOnly: true,
      group: "welcomer",
      userPermissions: ['MANAGE_SERVER'],
      examples: ['setguild my awesome server'],
      argsType: "single",
      args: [
        {
          type: "string",
          key: "guild",
          label: "guild",
          default: "",
          prompt: ''
        }
      ]
		});
	}

	async run(msg, args) {
    msg.guild.settings.set("guildname", args.guild ? args.guild : msg.guild.name)
    msg.react("👌")
    msg.channel.send(new Discord.RichEmbed().setTitle("Set Guild").setColor(0x5f42f4).setDescription("I successfully set the guild name to `" + (args.guild ? args.guild : msg.guild.name) + "`"))
	}
};
