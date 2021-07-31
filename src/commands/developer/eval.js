module.exports = {
    name: "eval",
    description: "evalDescription",
    usage: ["<prefix>eval <javascript code>", "<prefix>eval message.channel.send('hi');"],
    enabled: true,
    aliases: [],
    category: "developer",
    memberPermissions: [],

    nsfw: false,
    dev: true,
    cooldown: 1000,

    async execute(client, message, args, data) {
        try {
            if (!args[0]) {
                return client.tools.sendEmbed(message, {
                    description: `eval what??? genius`
                });
            }
            code = args.join(" ");
            try {
                return client.tools.sendEmbed(message, {
                    title: `result`,
                    description: `\`\`\`${eval(code)}\`\`\``
                });
            }
            catch (evalerr) {
                return client.tools.sendEmbed(message, {
                    description: `\`\`\`${evalerr}\`\`\``
                });
            }

        }
        catch (err) {
            console.log(err);
        }
    }
}