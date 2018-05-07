const Discord = require("discord.js");
var AWS = require('aws-sdk');
AWS.config.loadFromPath("../data/aws.json") // Schema: {"accessKeyId": "key", "secretAccessKey": "", "region": "us-east-1"} 
var lambda = new AWS.Lambda();
const winston = require("winston");

function determineDefaultChannel(guild) {
    if (guild.channels.find("name", "welcome")) return guild.channels.find("name", "welcome")
    if (guild.channels.find("name", "general")) return guild.channels.find("name", "general")
    return guild.channels.first()
}

module.exports = function (memberToWelcome) {
    if (!memberToWelcome.guild.settings.get("active", true)) return winston.info("Not welcoming " + memberToWelcome.id + " because welcome is off" ) ? null:null
    var channel = memberToWelcome.guild.settings.get("channel", null)
    if (channel) channel = memberToWelcome.guild.channels.get(channel)
    if (!channel) channel = determineDefaultChannel(memberToWelcome.guild)
    var gs = (name, _default) => memberToWelcome.guild.settings.get(name, _default)
    var params = {
        FunctionName: "warmwelcome-dev-hello",
        Payload: JSON.stringify({
            queryStringParameters: {
                name: memberToWelcome.user.username,
                avatar: memberToWelcome.user.displayAvatarURL.replace("size=2048", "size=128"),
                guild: memberToWelcome.guild.settings.get("guildname", memberToWelcome.guild.name),
                font: memberToWelcome.guild.settings.get("font", undefined),
                background: memberToWelcome.guild.settings.get("bg", "https://s3.amazonaws.com/random-stuff-voidcrafted/retro-game-background-For-Free-Wallpaper.jpg"),
                params: {
                    new_width: 1000,
                    offset_x: gs("offset_x", 0),
                    offset_y: gs("offset_y", -70),
                    welcome: gs("im_format", `Welcome %person%\nto %guild%!`).replace(/%person%/g, `${memberToWelcome.user.username}`).replace(/%guild%/g, memberToWelcome.guild.settings.get("guildname", memberToWelcome.guild.name)),
                    new_height: 500,
                    ava_sqdim: gs("ava_sqdim", 260),
                    text_offset_x: gs("text_offset_x", 0),
                    boxopacity: gs("boxopacity", 30),
                    text_offset_y: gs("text_offset_y", 140),
                    is_square: Boolean(gs("is_square", 0)),
                    blur_radius: gs("blur_radius", 5),
                    blur_offset_y: 250 - gs("boxheight", 250),
                    outline: true,
                    fontsize: gs("fontsize", 100)
                }
            }
        })
    }
    winston.debug("Invoking lambda with following params", params)
    lambda.invoke(params, async (err, payload) => {
        if (err) return console.error(err)
        var pl = JSON.parse(payload.Payload);
        if (pl.error) return channel.send(pl.errorMsg);
        var imageBuffer = Buffer.from(pl.body, "base64");
        var at = new Discord.Attachment(imageBuffer, "welcome.png");
        await channel.send(
            memberToWelcome.guild.settings.get("format", "Welcome %person% to %guild%!")
                .replace(/%person%/g, `<@${memberToWelcome.id}>`)
                .replace(/%guild%/g, memberToWelcome.guild.settings.get("guildname", memberToWelcome.guild.name)), at)
        winston.info("Successfully welcomed " + memberToWelcome.user.tag + " to " + memberToWelcome.guild.name + ".", {
            member: memberToWelcome.id,
            guild: memberToWelcome.guild.id
        })
    })
}