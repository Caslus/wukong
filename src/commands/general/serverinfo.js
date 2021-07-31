module.exports = {
    name: "serverinfo",
    description: "serverInfoDescription",
    usage: ["<prefix>serverinfo", "<prefix>serverinfo"],
    enabled: true,
    aliases: [],
    category: "general",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 10000,

    async execute(client, message, args, data) {
        try {
            let creationDate = await message.guild.createdAt.toISOString().replace(/-/g, '/').split('T')[0];
            let textChannels = await message.guild.channels.cache.filter(x => x.type === 'text').size;
            let voiceChannels = await message.guild.channels.cache.filter(x => x.type === 'voice').size;
            let categoryCount = await message.guild.channels.cache.filter(x => x.type === 'category').size;
            let roleCount = await message.guild.roles.cache.size;
            let verificationLevel = await message.guild.verificationLevel.toLowerCase().replace('_', ' ');
            let banCount = await message.guild.fetchBans().size;
            return client.tools.sendEmbed(message, {
                title: `${message.guild.name}`,
                thumbnail: { url: `${message.guild.iconURL({ dynamic: true, size: 256, format: 'png' })}` },
                fields: [
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "serverInfoId")}`,
                        value: `\`\`\`${message.guild.id}\`\`\``,
                        inline: false
                    },
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "serverInfoRegion")}`,
                        value: `\`\`\`${message.guild.region}\`\`\``,
                        inline: true
                    },
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "serverInfoVerificationLevel")}`,
                        value: `\`\`\`${verificationLevel}\`\`\``,
                        inline: true
                    },
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "serverInfoMembers")}`,
                        value: `\`\`\`${message.guild.memberCount}\`\`\``,
                        inline: true
                    },
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "serverInfoOwner")}`,
                        value: `\`\`\`${message.guild.owner.user.username} | ${message.guild.owner.id}\`\`\``,
                        inline: true
                    },
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "serverInfoCreation")}`,
                        value: `\`\`\`${creationDate}\`\`\``,
                        inline: false
                    },
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "serverInfoChannels") + " ```" + (textChannels + voiceChannels + categoryCount) + "```"}`,
                        value: `${"`" + textChannels + "` | " + await client.tools.getLocale(message.guild.lang, "serverInfoChannelsText") + "\n`" + voiceChannels + "` | " + await client.tools.getLocale(message.guild.lang, "serverInfoChannelsVoice") + "\n`" + categoryCount + "` | " + await client.tools.getLocale(message.guild.lang, "serverInfoChannelsCategory")}`,
                        inline: true
                    },
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "serverInfoRoles")}`,
                        value: `\`\`\`${roleCount}\`\`\``,
                        inline: true
                    },
                    {
                        name: `${await client.tools.getLocale(message.guild.lang, "serverInfoBans")}`,
                        value: `\`\`\`${banCount || 0}\`\`\``,
                        inline: false
                    }
                ],
                thumbnail: { url: `${message.guild.iconURL({ size: 512 })}` }
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}