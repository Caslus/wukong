module.exports = {
    name: "msgchannel",
    description: "msgChannelDescription",
    usage: ["<prefix>msgchannel <channel id> <message>", "<prefix>msgchannel 1234567812345678 hey there"],
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
                    description: `no channel id specified`
                });
            }
            let destination = args[0];
            args.shift();
            let text = args.join(" ");
            try {
                client.channels.cache.get(destination).send(text);
                return client.tools.sendEmbed(message, {
                    description: `sent message to ${client.channels.cache.get(destination).name}`
                });
            }
            catch {
                return client.tools.sendEmbed(message, {
                    description: `couldn't send message`
                });
            }

        }
        catch (err) {
            console.log(err);
        }
    }
}