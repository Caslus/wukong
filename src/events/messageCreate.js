const config = require("./../../config.json");
let cmdCooldown = {};

module.exports = async (client, message) => {
    try {
        if (message.author.bot) return;
        if (!message.guild) return;

        let guildData;
        if (!message.guild.lang) {
            guildData = await client.db.fetchGuild(message.guild.id);
            message.guild.lang = guildData.lang;
        }

        if (!message.guild.prefix) {
            guildData = await client.db.fetchGuild(message.guild.id);
            message.guild.prefix = guildData.prefix.toLowerCase();
        }

        if (!message.guild.premium) {
            guildData = await client.db.fetchGuild(message.guild.id);
            message.guild.premium = guildData.premium;
        }

        let prefix = message.guild.prefix;

        if (message.content === `<@!${message.client.user.id}>` || message.content === `<@${message.client.user.id}>`) {
            return client.tools.sendEmbed(message, {
                description: `${await client.tools.getLocale(message.guild.lang, "forgotPrefix", prefix)}`
            });
        }

        if (!message.content.toLowerCase().startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

        if (!cmd) return;

        if (cmd.nsfw && !message.channel.nsfw) {
            return client.tools.sendEmbed(message, {
                description: `${await client.tools.getLocale(message.guild.lang, "notNsfwChannel")}`
            });
        }

        if (cmd.dev && message.author.id !== config.ownerID) return;

        let userPerms = [];
        cmd.memberPermissions.forEach((perm) => {
            if (!message.channel.permissionsFor(message.member).has(perm)) {
                userPerms.push(perm);
            }
        });

        if (userPerms.length > 0) {
            return client.tools.sendEmbed(message, {
                description: `${`${await client.tools.getLocale(message.guild.lang, "missingPermissions")}\n` + userPerms.map((p) => `\`${p}\``).join(", ")}`
            });
        }

        let userCooldown = cmdCooldown[message.author.id];

        if (!userCooldown) {
            cmdCooldown[message.author.id] = {};
            uCooldown = cmdCooldown[message.author.id];
        }

        let time = uCooldown[cmd.name] || 0;
        if (time && (time > Date.now())) {
            let timeLeft = Math.ceil((time - Date.now()) / 1000);
            if (message.guild.premium) {
                return client.tools.sendEmbed(message, {
                    description: `${await client.tools.getLocale(message.guild.lang, "commandOnCooldownPremium", timeLeft)}`
                });
            }
            else {
                return client.tools.sendEmbed(message, {
                    description: `${await client.tools.getLocale(message.guild.lang, "commandOnCooldown", timeLeft)}`
                });
            }
        }

        if (message.guild.premium == true) {
            cmdCooldown[message.author.id][cmd.name] = Date.now() + (cmd.cooldown / 2);
        }
        else {
            cmdCooldown[message.author.id][cmd.name] = Date.now() + cmd.cooldown;
        }

        let userData = await client.db.fetchUser(message.author.id);

        if (userData.blacklisted) {
            return client.tools.sendEmbed(message, {
                description: `${await client.tools.getLocale(message.guild.lang, "blacklistedMsg")}`
            });
        }

        if (!guildData) guildData = await client.db.fetchGuild(message.guild.id);
        let data = {};
        data.user = userData;
        data.guild = guildData;
        data.cmd = cmd;
        data.config = config;
        cmd.execute(client, message, args, data);
    }
    catch (err) {
        console.log(err);
    }
}