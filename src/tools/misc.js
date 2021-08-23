const fs = require('fs');
const Discord = require('discord.js');
const config = require('../../config.json');
var languages = JSON.parse(fs.readFileSync(`./src/locale.json`));
const math = require('mathjs');
const moment = require('moment');
require('moment-precise-range-plugin');

module.exports.getLocale = async function (lang, string, ...vars) {
    let locale = languages[lang][string];
    vars.forEach((newVar) => {
        locale = locale.replace('%VAR%', newVar);
    })
    return locale;
}

module.exports.sendEmbed = async function (message, embed) {
    let newEmbed = new Discord.MessageEmbed()
        .setColor(config.color);
    embed = { ...newEmbed, ...embed };
    return message.channel.send({ embeds: [embed] });
}

module.exports.calc = async function (expression) {
    let result;
    try {
        result = math.evaluate(expression);
    }
    catch (err) {
        result = err.message;
    }
    return result;
}

module.exports.randomNumber = async function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

module.exports.resolveUser = async function (search, client) {
    // this is probably not the best approach, but it's the best i can think of right now, i'm tired 😭😭
    let user = null;
    if (!search || typeof search !== "string") return;
    search = search.replace(/\D/g, '');
    try {
        user = await client.users.fetch(search.toString());
        if (user) {
            return user;
        }
    }
    catch {
        return null;
    }
    return null;
}

module.exports.resolveMember = async function (search, guild) {
    let member = null;
    if (!search || typeof search !== "string") return;
    if (search.match(/^<@!?(\d+)>$/)) {
        const id = search.match(/^<@!?(\d+)>$/)[1];
        member = await guild.members.fetch(id).catch(() => { });
        if (member) return member;
    };
    if (search.match(/^!?(\w+)#(\d+)$/)) {
        guild = await guild.fetch();
        member = guild.members.cache.find((m) => m.user.tag === search);
        if (!member) {
            member = guild.members.fetch({ cache: true }).then(m => m.find(m => m.user.tag.toLowerCase() === search.toLowerCase()));
        };
        if (member) return member;
    };
    member = await guild.members.fetch(search).catch(() => { });
    return member;
};

module.exports.normalizeString = async function (string) {
    string_norm = string.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    return string_norm.toLowerCase();
}

module.exports.convertTime = async function (milliseconds) {

    return moment.preciseDiff(0, milliseconds);

};
