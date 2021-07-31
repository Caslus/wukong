module.exports = {
    name: "help",
    description: "helpCmdDescription",
    usage: ["<prefix>help <command>", "<prefix>help avatar"],
    enabled: true,
    aliases: ["commands", "usage"],
    category: "general",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 5000,

    async execute(client, message, args, data) {
        try {
            let cmd = args[0] ? (await client.commands.get(args[0].toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0].toLowerCase()))) : null;
            if (!cmd) {
                return client.tools.sendEmbed(message, {
                    title: `${await client.tools.getLocale(message.guild.lang, "helpTitle")}`,
                    description: `${await client.tools.getLocale(message.guild.lang, "helpDescription", client.config.docsUrl)}`,
                    fields: [
                        {
                            name: `${await client.tools.getLocale(message.guild.lang, "helpUsageTitle")}`,
                            value: `${await client.tools.getLocale(message.guild.lang, "helpUsageValue", message.guild.prefix)}`
                        }
                    ]
                });
            }
            else {
                let aliasesList = (cmd.aliases.length < 1) ? `${await client.tools.getLocale(message.guild.lang, "none")}` : cmd.aliases.join(", ");
                let requiredPerms = (cmd.memberPermissions.length < 1) ? `${await client.tools.getLocale(message.guild.lang, "none")}` : cmd.memberPermissions.join("\n");
                return client.tools.sendEmbed(message, {
                    title: `${cmd.name}`,
                    description: `${await client.tools.getLocale(message.guild.lang, cmd.description)}`,
                    fields: [
                        {
                            name: `${await client.tools.getLocale(message.guild.lang, "enabled")}`,
                            value: `${cmd.enabled ? "👍" : "👎"}`,
                            inline: true
                        },
                        {
                            name: `${await client.tools.getLocale(message.guild.lang, "category")}`,
                            value: `${cmd.category}`,
                            inline: true
                        },
                        {
                            name: `${await client.tools.getLocale(message.guild.lang, "aliases")}`,
                            value: `${aliasesList}`,
                            inline: true
                        },
                        {
                            name: `${await client.tools.getLocale(message.guild.lang, "cooldown")}`,
                            value: `${cmd.cooldown / 1000}s`,
                            inline: true
                        },
                        {
                            name: `${await client.tools.getLocale(message.guild.lang, "requiredPerms")}`,
                            value: `\`\`\`${requiredPerms}\`\`\``
                        },
                        {
                            name: `${await client.tools.getLocale(message.guild.lang, "usage")}`,
                            value: `\`\`\`${cmd.usage.map(x => x.replace(/<prefix>/g, data.guild.prefix)).join("\n")}\`\`\``
                        }
                    ]
                })
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}