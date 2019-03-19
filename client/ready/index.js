const v = require("../../package.json");
const c = require("../../config/main");
module.exports = (client, config) => {
    console.log(`botを起動しました ${client.user.tag}`);
    client.channels
        .get(config.channel_id.startup_log)
        .send("起動しました", { embed: { timestamp: new Date() } });
    client.user.setActivity(`${c.prefix}help | [Esc]™Group ${v.version}`);
    return;
};
