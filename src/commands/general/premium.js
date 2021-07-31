module.exports = {
    name: "premium",
    description: "premiumDescription",
    usage: ["<prefix>premium", "<prefix>premium"],
    enabled: true,
    aliases: ["vip"],
    category: "general",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 5000,

    async execute(client, message, args, data) {
        try {
            guild = await client.db.fetchGuild(message.guild.id);
            if (guild) {
                return (client.tools.sendEmbed(message, {
                    title: `${await client.tools.getLocale(message.guild.lang, "premiumStatus")}`,
                    description: `${guild.premium ? "👍" : "👎"}`,
                    fields: [
                        {
                            name: `${await client.tools.getLocale(message.guild.lang, "premiumBenefitsTitle")}`,
                            value: `${await client.tools.getLocale(message.guild.lang, "premiumBenefits")}`
                        },
                        {
                            name: `${await client.tools.getLocale(message.guild.lang, "getPremiumTitle")}`,
                            value: `${await client.tools.getLocale(message.guild.lang, "getPremiumDesc", "<@" + client.config.ownerID + ">")}`
                        }
                    ]
                }))
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}