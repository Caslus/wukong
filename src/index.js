var AsciiTable = require('ascii-table');
const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const util = require('util');
const config = require('../config.json');
const readdir = util.promisify(fs.readdir);
const client = new Discord.Client({
    disableEveryone: true,
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES', 'GUILD_MEMBERS']
});
client.events = new Discord.Collection();
client.commands = new Discord.Collection();
client.config = config;
client.db = require("./tools/db/mongoose.js");
client.tools = require("./tools/misc.js");
async function init() {
    const eventFiles = fs.readdirSync('./src/events/').filter(file => file.endsWith('.js'));
    var eventsTable = new AsciiTable('events');
    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        eventsTable.addRow(eventName, 'ok');
        client.on(eventName, event.bind(null, client));
    }
    console.log(eventsTable.toString());

    let folders = await readdir('./src/commands/');
    var commandsTable = new AsciiTable('commands');
    folders.forEach(directory => {
        const commandFiles = fs.readdirSync('./src/commands/' + directory + "/").filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./commands/${directory}/${file}`);
            commandsTable.addRow(command.name, 'ok');
            client.commands.set(command.name, command);
        }
    })
    console.log(commandsTable.toString());

    mongoose.connect(config.mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected to database')
    }).catch((err) => {
        console.log('unable to connect to database. error: ' + err)
    })

    await client.login(config.token);
}

init();

process.on('unhandledRejection', err => {
    console.log('unknown error occured:\n');
    console.log(err);
})