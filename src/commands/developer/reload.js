module.exports = {
    name: "reload",
    description: "reloadDescription",
    usage: ["<prefix>reload <command>", "<prefix>reload avatar"],
    enabled: true,
    aliases: [],
    category: "developer",
    memberPermissions: [],

    nsfw: false,
    dev: true,
    cooldown: 2000,

    async execute(client, message, args, data) {
        try {
            if (!args[0]) {
                return client.tools.sendEmbed(message, {
                    description: `no command specified`
                });
            }

            const commandName = args[0];
            const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!cmd) {
                return client.tools.sendEmbed(message, {
                    description: `no command \`${commandName}\` found`
                });
            }
            cmdPath = require.resolve(`./../../../src/commands/${cmd.category}/${cmd.name}.js`);
            delete require.cache[cmdPath];
            const newCmd = require(cmdPath);
            client.commands.set(newCmd.name, newCmd);
            return client.tools.sendEmbed(message, {
                description: `\`${newCmd.name}\` has been reloaded`
            });

        }
        catch (err) {
            console.log(err);
        }
    }
}