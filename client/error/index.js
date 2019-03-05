module.exports = (client, error, channel_id) => {
    console.error(error);
    if (!bot_on) return;
    return client.channels.get(channel_id.error).send(error);
};
