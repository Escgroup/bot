const { Command } = require("discord.js-commando");

const package_file = require("../../package.json");
const info_channel = require("../../config/main.js").guild.main.channel.info;

module.exports = class bot_info_command extends Command {
    constructor(client) {
        super(client, {
            name: "botinfo",
            aliases: ["binfo", "bot情報"],
            group: "bot",
            memberName: "botinfo",
            description: "botの情報を表示します",
        });
    }

    run(message) {
        const bot = this.client.user;
        const guilds = this.client.guilds;
        const users = this.client.users;
        const channels = this.client.channels;

        return message.say({
            embed: {
                author: {
                    icon_url: bot.avatarURL,
                    name: `${bot.username}の情報`,
                },
                fields: [
                    { name: "ユーザー名", value: bot.tag, inline: true },
                    { name: "ID", value: bot.id, inline: true },
                    {
                        name: "ステータス",
                        value: bot.presence.status,
                        inline: true,
                    },
                    { name: "サーバー数", value: guilds.size, inline: true },
                    { name: "ユーザー数", value: users.size, inline: true },
                    {
                        name: "チャンネル数",
                        value: channels.size,
                        inline: true,
                    },
                    {
                        name: "バージョン",
                        value: package_file.version,
                        inline: true,
                    },
                    { name: "開発・運営", value: "mouse#2240", inline: true },
                    {
                        name: "質問・意見・問題報告等",
                        value: "`information`コマンド または [GitHub](https://github.com/Escgroup/Esc-bot/issues)",
                    },
                ],
                footer: {
                    text: "起動時間",
                },
                timestamp: this.client.readyAt,
                color: 0xb8e986,
            },
        });
    }
};
