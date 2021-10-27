var winston = require('winston');
var strftime = require('strftime');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  colorize: true,
  level: "silly",
  label: "[warm welcome]"
});
winston.add(winston.transports.File, {
  filename: "../data/bot.log",
  level: "silly"
})
// add more Winston options if desired
