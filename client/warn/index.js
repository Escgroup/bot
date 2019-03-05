module.exports = (client, warn, channel_id) => {
    console.warn(warn);
    if (!bot_on) return;
    return client.channels.get(channel_id.warn).send(warn);
};
