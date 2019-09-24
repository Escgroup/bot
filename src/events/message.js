// eslint-disable-next-line max-lines-per-function
module.exports = (client, message) => {
    const log_message = message.cleanContent;

    const webhook_option = {
        username: message.member.displayName,
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
                        name: "User Tag",
                        value: message.author.tag,
                        inline: true,
                    },
                    {
                        name: "User ID",
                        value: message.author.id,
                        inline: true,
                    },
                    {
                        name: "Message URL",
                        value: `[message URL](${message.url})`,
                        inline: true,
                    },
                    {
                        name: "Message ID",
                        value: message.id,
                        inline: true,
                    },
                    {
                        name: "Server name",
                        value: message.guild.name,
                        inline: true,
                    },
                    {
                        name: "Channel name",
                        value: `<#${message.channel.id}>`,
                        inline: true,
                    },
                ],
                color: message.member.displayColor,
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
        .get("625989592369332236")
        .fetchWebhooks()
        .then(hooks => {
            hooks.first().send(log_message, webhook_option);
        });
};
