module.exports = {
    name: "roles",
    description: "rolesDescription",
    usage: ["<prefix>roles", "<prefix>roles"],
    enabled: true,
    aliases: [],
    category: "general",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 10000,

    async execute(client, message, args, data) {
        try {
            let roles = message.guild.roles.cache.map(x => x.members.size + "⠀|⠀" + x.name + "\n").join(" ");
            return message.channel.send(`\`\`\`asciidoc\n${message.guild.name}\n------------------------\n ${roles}\`\`\``);
        }
        catch (err) {
            console.log(err);
        }
    }
}