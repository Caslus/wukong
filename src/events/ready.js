module.exports = async (client) => {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function cyclePresence() {
        while (true) {
            for (let i = 0; i < client.config.presences.length; i++) {
                client.user.setPresence({ activity: { name: `${client.config.defaultPrefix} | ${client.config.presences[i]}` }, status: "dnd" });
                await sleep(15000);
            }
        }
    }

    console.log(`${client.config.name} is ready`);
    cyclePresence();
}