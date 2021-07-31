const fs = require('fs');
const Discord = require('discord.js');
const config = require('../../config.json');
var languages = JSON.parse(fs.readFileSync(`./src/locale.json`));
const math = require('mathjs');

module.exports.getLocale = async function (lang, string, ...vars) {
    let locale = languages[lang][string];
    let count = 0;
    //locale = locale.replace(/%VAR%/g, () => vars[count] !== null ? vars[count] : "%VAR%");
    vars.forEach((newVar) => {
        locale = locale.replace('%VAR%', newVar);
    })
    return locale;
}

module.exports.sendEmbed = async function (message, embed) {
    let newEmbed = new Discord.MessageEmbed()
        .setColor(config.color);
    embed = { ...newEmbed, ...embed };
    return message.channel.send({ embed: embed });
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

    let roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
    let days = roundTowardsZero(milliseconds / 86400000),
        hours = roundTowardsZero(milliseconds / 3600000) % 24,
        mins = roundTowardsZero(milliseconds / 60000) % 60,
        secs = roundTowardsZero(milliseconds / 1000) % 60;
    if (secs === 0) {
        secs++;
    }
    let laDays = days > 0,
        laHours = hours > 0,
        laMinutes = mins > 0;
    let pattern =
        (!laDays ? "" : (laMinutes || laHours) ? "{days} days, " : "{days} days & ") +
        (!laHours ? "" : (laMinutes) ? "{hours} hours, " : "{hours} hours & ") +
        (!laMinutes ? "" : "{mins} mins") +
        (" {secs} seconds");
    let sentence = pattern
        .replace("{duration}", pattern)
        .replace("{days}", days)
        .replace("{hours}", hours)
        .replace("{mins}", mins)
        .replace("{secs}", secs);
    return sentence;

};
