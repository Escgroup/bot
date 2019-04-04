const { Command } = require("discord.js-commando");

module.exports = class user_info extends Command {
    constructor(client) {
        super(client, {
            name: "userinfo",
            aliases: ["uinfo", "ユーザー情報"],
            group: "bot",
            memberName: "userinfo",
            description: "ユーザーの情報を表示します",
            args: [
                {
                    key: "user",
                    type: "user",
                    prompt: "ユーザー名又はIDを入力してください",
                    default: "",
                },
            ],
        });
    }

    run(message, { user }) {
        const user_info = user_id => {
            const user = this.client.users.get(user_id);
            return {
                embed: {
                    author: {
                        icon_url: user.avatarURL,
                        name: `${user.username}の情報`,
                    },
                    thumbnail: { url: user.avatarURL },
                    fields: [
                        { name: "ユーザー名", value: user.tag, inline: true },
                        { name: "ID", value: user.id, inline: true },
                        {
                            name: "ステータス",
                            value: user.presence.status,
                            inline: true,
                        },
                        {
                            name: "Bot",
                            value: user.bot ? "はい" : "いいえ",
                            inline: true,
                        },
                    ],
                    footer: { text: "作成日" },
                    timestamp: user.createdAt,
                    color: 0xb8e986,
                },
            };
        };

        if (user) {
            return message.say(user_info(user.id));
        } else {
            return message.say(user_info(message.author.id));
        }
    }
};
