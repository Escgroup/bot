module.exports = (client, message, config) => {
    const embed = {
        title: "メッセージの削除",
        author: {
            name: message.author.tag,
            icon_url: message.author.avatarURL,
        },
        fields: [
            {
                name: "内容",
                value: message.cleanContent,
            },
            {
                name: "サーバー",
                value: message.guild.name,
                inline: true,
            },
            {
                name: "チャンネル",
                value: `<#${message.channel.id}>`,
                inline: true,
            },
        ],
        color: 0xd0021b,
    };
    client.channels
        .get(config.channel_id.message_delete_update)
        .send({ embed });
};
