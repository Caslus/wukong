module.exports = {
    name: "servericon",
    description: "serverIconDescription",
    usage: ["<prefix>servericon", "<prefix>servericon"],
    enabled: true,
    aliases: ["serverpfp"],
    category: "general",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 5000,

    async execute(client, message, args, data) {
        try {
            if (!message.guild.iconURL()) return client.tools.sendEmbed(message, {
                description: `${await client.tools.getLocale(message.guild.lang, "noServerIcon")}`
            });
            return client.tools.sendEmbed(message, {
                description: `${message.guild.name}`,
                image: { url: `${message.guild.iconURL({ dynamic: true, size: 2048, format: 'png' })}` }
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}