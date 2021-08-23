module.exports = {
    name: "userinfo",
    description: "userInfoDescription",
    usage: ["<prefix>userinfo <mention>", "<prefix>userinfo @somereallycooluser"],
    enabled: true,
    aliases: [],
    category: "general",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 5000,

    async execute(client, message, args, data) {
        try {
            let fetch = !args[0] ? null : await client.tools.resolveUser(args[0], client);
            let user = fetch ? fetch : message.author;
            let member = await client.tools.resolveMember(user.id, message.guild);
            let created = await client.tools.convertTime(Date.now() - user.createdAt);
            let joined = await client.tools.convertTime(Date.now() - member.joinedAt);
            return client.tools.sendEmbed(message, {
                title: `${member.displayName || user.username}`,
                thumbnail: { url: `${user.displayAvatarURL({ dynamic: true, size: 512, format: 'png' })}` },
                fields: [
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "discordTag")}`,
                        value: `\`\`\`${user.username}#${user.discriminator}\`\`\``,
                        inline: false
                    },
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "discordId")}`,
                        value: `\`\`\`${user.id}\`\`\``,
                        inline: true
                    },
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "accountCreatedAt")}`,
                        value: `\`\`\`${created}\`\`\``,
                        inline: true
                    },
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "joinedGuildAt")}`,
                        value: `\`\`\`${joined}\`\`\``,
                        inline: false
                    }
                ],
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}