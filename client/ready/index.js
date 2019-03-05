module.exports = (client, channel_id, bot_on) => {
    console.log("再接続しています");
    if (!bot_on) return;
    client.channels
        .get(channel_id.startup_log)
        .send("再起動しています", { embed: { timestamp: new Date() } });
};
