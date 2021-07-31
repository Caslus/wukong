module.exports = {
    name: "prefix",
    description: "prefixDescription",
    usage: ["<prefix>prefix <new prefix>", "<prefix>prefix w!"],
    enabled: true,
    aliases: ["setprefix"],
    category: "admin",
    memberPermissions: ["ADMINISTRATOR"],

    nsfw: false,
    dev: false,
    cooldown: 5000,

    async execute(client, message, args, data) {
        try {
            if (!args[0]) {
                return client.tools.sendEmbed(message, {
                    description: `${await client.tools.getLocale(message.guild.lang, "prefixNoArgs", message.guild.prefix)}`
                });
            }
            let prefix = args.join(" ");
            data.guild.prefix = prefix;
            await data.guild.save();
            message.guild.prefix = prefix.toLowerCase();
            return client.tools.sendEmbed(message, {
                description: `${await client.tools.getLocale(message.guild.lang, "updatedPrefix", message.guild.prefix)}`
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}