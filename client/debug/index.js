module.exports = (client, debug, channel_id, bot_on) => {
    console.debug(debug);

    if (!bot_on) return;

    client.channels.get(channel_id.debug).send(debug);
};
