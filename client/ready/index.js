module.exports = (client, config) => {
    console.log(`botを起動しました ${client.user.tag}`);
    client.channels
        .get(config.channel_id.startup_log)
        .send("起動しました", { embed: { timestamp: new Date() } });
    client.user.setActivity(",help | [Esc]™Group v3.0.1");
    return;
};
