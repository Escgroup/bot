module.exports = (client, disconnect, channel_id) => {
    console.log(disconnect);
    if (bot_on) client.channels.get(channel_id.disconnect).send(disconnect);
    process.exit(0);
};
