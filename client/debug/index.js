module.exports = (client, debug, channel_id) => {
    console.debug(debug);
    if (!client.readyAt) return;
    return client.channels.get(channel_id.debug).send(debug);
};
