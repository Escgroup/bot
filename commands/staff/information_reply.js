const { Command } = require("discord.js-commando");

const config = require("../../config/main.js");

module.exports = class information_command extends Command {
    constructor(client) {
        super(client, {
            name: "information_reply",
            aliases: ["infor"],
            group: "staff",
            memberName: "information_reply",
            description: "質問、意見等の返信。",
            args: [
                {
                    key: "user",
                    prompt: "返信するユーザーを指定してください。",
                    type: "user",
                },
                {
                    key: "title",
                    prompt: "返信する問題のタイトルを入力してください。",
                    type: "string",
                },
                {
                    key: "text",
                    prompt: "返信内容を入力してください。",
                    type: "string",
                },
            ],
        });
    }

    run(message, args) {
        const user = message.author;
        if (message.channel.id !== config.guild.main.channel.infor) return;

        const info_re = {
            embed: {
                author: {
                    name: user.username,
                    icon_url: user.avatarURL,
                },
                title: `${args.title}についての返答`,
                description: `${args.text}\n
                続けて対応が必要な場合は再度\`information\`コマンドを利用しタイトルの最後に何回目か書いてください。`,
            },
        };

        args.user.send(info_re).then(() => {
            message.say(`${args.user}に返信しました`, info_re);
        });
    }
};
