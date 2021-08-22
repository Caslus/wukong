module.exports = {
    name: "coinflip",
    description: "coinflipDescription",
    usage: ["<prefix>coinflip <amount>", "<prefix>coinflip 500"],
    enabled: true,
    aliases: ["cf", "cointoss"],
    category: "economy",
    memberPermissions: [],

    nsfw: false,
    dev: false,
    cooldown: 3000,

    async execute(client, message, args, data) {
        try {
            let coinflip = Math.random() < 0.5;
            let heads = await client.tools.getLocale(message.guild.lang, "coinflipHeads");
            let tails = await client.tools.getLocale(message.guild.lang, "coinflipTails");
            let result = coinflip ? heads : tails;

            if (!args[0]) {
                return client.tools.sendEmbed(message, {
                    description: `🥴 - ${await client.tools.getLocale(message.guild.lang, "coinflipResponse", result)}`
                });
            }

            let bet = parseInt(args[0]);
            if (bet <= data.user.bank) {
                let user = await client.db.fetchUser(message.author.id);
                if (coinflip) {
                    user.bank += bet;
                    await user.save();
                    return client.tools.sendEmbed(message, {
                        description: `🤩 - ${await client.tools.getLocale(message.guild.lang, "coinflipBetResponse", result, bet * 2, user.bank)}`
                    });
                }
                else {
                    user.bank -= bet;
                    await user.save();
                    return client.tools.sendEmbed(message, {
                        description: `😭 - ${await client.tools.getLocale(message.guild.lang, "coinflipBetLostResponse", result, bet, user.bank)}`
                    });
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}