const Discord = require('discord.js');
module.exports = async (client, guild) => {
    try {
        console.log(`new guild: ${guild.name} | ${guild.id}`);
        guild.fetchAuditLogs({ type: "BOT_ADD", limit: 1 }).then(log => {
            let embed = new Discord.MessageEmbed()
                .setColor(client.config.color)
                .setTitle("yo thanks for adding me")
                .setDescription(`check out the [docs](${client.config.docsUrl}) if you need some help with the commands!`);
            log.entries.first().executor.send({ embeds: [embed] });
        });
    }
    catch (err) {
        console.log(err)
    }

}