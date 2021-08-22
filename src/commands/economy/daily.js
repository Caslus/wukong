module.exports = {
    name: "daily",
    description: "dailyDescription",
    usage: ["<prefix>daily", "<prefix>daily"],
    enabled: true,
    aliases: [],
    category: "economy",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 3000,

    async execute(client, message, args, data) {
        try {
            if (Date.now() - data.user.lastDaily > 86400000) {
                let user = await client.db.fetchUser(message.author.id);
                let reward = await client.tools.randomNumber(100, 250);
                user.lastDaily = Date.now();
                user.bank += reward;
                await user.save();
                return client.tools.sendEmbed(message, {
                    description: `🎁 - ${await client.tools.getLocale(message.guild.lang, "dailyMsg", reward)}`
                });
            }
            else {
                return client.tools.sendEmbed(message, {
                    description: `🚫 - ${await client.tools.getLocale(message.guild.lang, "dailyFailMsg", await client.tools.convertTime(data.user.lastDaily + 86400000 - Date.now()))}`
                });
            }

        }
        catch (err) {
            console.log(err);
        }
    }
}