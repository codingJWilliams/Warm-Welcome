const stripIndents = require('common-tags').stripIndents;
const commando = require("discord.js-commando");
const Discord = require("discord.js");
const {Guild, Channel} = Discord;
var AWS = require('aws-sdk');
AWS.config.loadFromPath("../data/aws.json") // Schema: {"accessKeyId": "key", "secretAccessKey": "", "region": "us-east-1"} 
var lambda = new AWS.Lambda();
const winston = require("winston");

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
            name: 'test',
            group: "welcomer",
            memberName: 'test',
            userPermissions: ["MANAGE_SERVER"],
			description: 'Triggers a test welcome in an identical way to how a real welcome would be triggered.',
			guildOnly: true
		});
	}

	async run(msg, args) {
        require("../../doWelcome")( msg.member )
    }
};