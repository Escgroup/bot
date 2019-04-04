module.exports = (client, oldMessage, newMessage, config) => {
    const embed = {
        title: "メッセージの更新",
        author: {
            name: newMessage.author.tag,
            icon_url: newMessage.author.avatarURL,
        },
        fields: [
            {
                name: "更新前",
                value: oldMessage.cleanContent,
            },
            {
                name: "更新後",
                value: newMessage.cleanContent,
            },
            {
                name: "サーバー",
                value: newMessage.guild.name,
                inline: true,
            },
            {
                name: "チャンネル",
                value: `<#${newMessage.channel.id}>`,
                inline: true,
            },
        ],
        timestamp: new Date(),
        color: 0x09e151,
    };
    client.channels
        .get(config.channel_id.message_delete_update)
        .send({ embed });
};
