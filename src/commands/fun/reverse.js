module.exports = {
    name: "reverse",
    description: "reverseDescription",
    usage: ["<prefix>reverse <text>", "<prefix>reverse yo dude this is some really cool text"],
    enabled: true,
    aliases: [],
    category: "general",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 5000,

    async execute(client, message, args, data) {
        try {
            if (!args[0]) {
                return client.tools.sendEmbed(message, {
                    description: `${await client.tools.getLocale(message.guild.lang, "noArgs")}`
                });
            }
            args = args.join(" ").split("").reverse().join("");
            return client.tools.sendEmbed(message, {
                description: `\`${args}\``
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}