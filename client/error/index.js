module.exports = (client, error) => {
    console.error(error);
    if (!client.readyAt) return;
    return client.channels.get("542909982358634496").send(error);
};
