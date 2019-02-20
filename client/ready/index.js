module.exports = (client, config) => {
    console.log(`botを起動しました ${client.user.tag}`);
    client.channels
        .get(config.channel_id.startup_log)
        .send("起動しました", { embed: { timestamp: new Date() } });
    client.user.setActivity("Commandoテスト中");
    return;
};
