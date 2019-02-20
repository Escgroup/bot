module.exports = (client, warn, channel_id) => {
    console.warn(warn);
    if (!client.readyAt) return;
    return client.channels.get(channel_id.warn).send(warn);
};
