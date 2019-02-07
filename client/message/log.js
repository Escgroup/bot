module.exports = (client, message) => {
    const log_message = message.cleanContent;

    /*global webhook_option*/
    webhook_option = {
        username: message.author.tag,
        avatarURL: message.author.avatarURL,
    };

    if (message.attachments.first()) {
        webhook_option.file = message.attachments.first().url;
    }

    if (message.guild) {
        webhook_option.embeds = [
            {
                fields: [
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
                timestamp: new Date(),
            },
        ];
    } else {
        webhook_option.embeds = [
            {
                footer: {
                    text: "DM",
                },
                timestamp: new Date(),
            },
        ];
    }

    client.channels
        .get("542909938058526721")
        .fetchWebhooks()
        .then(hooks => {
            hooks.first().send(log_message, webhook_option);
        });
};
