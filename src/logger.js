var winston = require('winston');
var strftime = require('strftime');

winston.remove(winston.transports.Console);     // remove the default options
winston.add(winston.transports.Console, {       // and substitute these
  /**formatter: function (options) { // Return string will be passed to winston.
    return options.timestamp() + ' ' + options.level.toUpperCase() + " " + options.message );
  }*/
  colorize: true,
  level: "silly",
  label: "[warmwelcome]"
});
winston.add(winston.transports.File, {
  filename: "../data/bot.log",
  level: "silly"
})
// add more Winston options if desired