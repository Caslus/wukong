module.exports = {
    name: "info",
    description: "infoDescription",
    usage: ["<prefix>info", "<prefix>info"],
    enabled: true,
    aliases: ["botstats", "botinfo"],
    category: "general",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 10000,

    async execute(client, message, args, data) {
        try {
            let uptime = await client.tools.convertTime(client.uptime);
            let ram = ((process.memoryUsage().heapUsed / 1024 / 1024) + (process.memoryUsage().heapTotal / 1024 / 1024)).toFixed(2);
            return client.tools.sendEmbed(message, {
                title: `${client.user.username}`,
                description: `${await client.tools.getLocale(message.guild.lang, "informationDescription")}`,
                fields: [
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "channels")}`,
                        value: `\`\`\`${client.channels.cache.size}\`\`\``,
                        inline: true
                    },
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "users")}`,
                        value: `\`\`\`${client.users.cache.size}\`\`\``,
                        inline: true
                    },
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "guilds")}`,
                        value: `\`\`\`${client.guilds.cache.size}\`\`\``,
                        inline: true
                    },
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "ramUsage")}`,
                        value: `\`\`\`${ram}MB\`\`\``,
                        inline: true
                    },
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "apiLatency")}`,
                        value: `\`\`\`${client.ws.ping}ms\`\`\``,
                        inline: true
                    },
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "uptime")}`,
                        value: `\`\`\`${uptime}\`\`\``,
                        inline: true
                    }
                ],
                thumbnail: { url: `${client.user.displayAvatarURL({ size: 512 })}` }
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}