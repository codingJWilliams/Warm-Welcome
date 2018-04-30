const stripIndents = require('common-tags').stripIndents;
const commando = require("discord.js-commando");
const Discord = require("discord.js");
const {Guild, Channel} = Discord;


module.exports = class SetFormatCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'setflag',
			memberName: 'setflag',
            description: 'Sets an image generation flag. See the details for a list of these. You shouldn\'t need to touch these for normal use.',
            details: `
*offset_x* - how far to the right of the center of the image the avatar should be [0]
*offset_y* - how far down from the center of the image the avatar should be [-70]
*ava_sqdim* - the diameter of the avatar, or one side length if is_square is enabled [260]
*is_square* - whether the avatar should be left square (if 1, crop into circle) [0]
*text_offset_x* - how far to the right of the center of the image the text should be [0]
*text_offset_y* - how far down from the center of the image the text should be [140]
*blur_radius* - how strong should the blur of the box be [5]
*boxheight* - how tall should the box be? [250]
*boxopacity* - how opaque should the box be? [30]
*fontsize* - what size font should be used [100]`,
            guildOnly: true,
            group: "welcomer",
            userPermissions: ['MANAGE_SERVER'],
            examples: ['setflag fontsize 90', 'setflag is_square 1', 'setflag offset_y -20'],
            args: [
                {
                    type: "string",
                    key: "flag",
                    label: 'flag',
                    prompt: "Which flag would you like to set (see `help setflag`)?"
                },
                {
                    type: "integer",
                    key: "value",
                    label: "value",
                    prompt: "What would you like to set the flag to?"
                }
            ]
		});
	}

	async run(msg, args) {
        var flags = {
            "offset_x": {min: -700, max: 700},
            "offset_y": {min: -700, max: 700},
            "ava_sqdim": {min: 2, max: 2000},
            "is_square": {min: 0, max: 1},
            "text_offset_x": {min: -700, max: 700},
            "text_offset_y": {min: -700, max: 700},
            "blur_radius": {min: 0, max: 60},
            "boxopacity": {min: 0, max: 255},
            "boxheight": {min: 0, max: 500},
            "fontsize": {min: 10, max: 300}
        };
        if (!flags.hasOwnProperty(args.flag)) return msg.react("🚫") && msg.channel.send("That's not a supported flag. See " + msg.guild.settings.get("prefix", ".") + "help setflag for more information.");
        var flagLimits = flags[args.flag];
        if (args.value > flagLimits.max) return msg.react("🚫") && msg.channel.send("That's too large (max " + flagLimits.max + "). See " + msg.guild.settings.get("prefix", ".") + "help setflag for more information.");
        if (args.value < flagLimits.min) return msg.react("🚫") && msg.channel.send("That's too small (min " + flagLimits.min + "). See " + msg.guild.settings.get("prefix", ".") + "help setflag for more information.");
        msg.guild.settings.set(args.flag, args.value)
        msg.react("👌")
	}
};
