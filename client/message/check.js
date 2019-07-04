const ms_time = 1000;
module.exports = async (client, message) => {
    const user = message.author;
    const channel = message.channel;
    const now = message.createdTimestamp;

    const fetch_messages = await channel.fetchMessages({
        limit: 1,
        before: message.id,
    });
    const fetch_message = fetch_messages.first();
    const at = fetch_message.createdTimestamp;

    if (fetch_message.author.id !== user.id) return true;

    const time = (now - at) / ms_time;
    if (time < 1.8) {
        message
            .reply("\n:x: | もう少しゆっくり発言してください")
            .then(remove => remove.delete(3000));
        return false;
    } else {
        return true;
    }
};
