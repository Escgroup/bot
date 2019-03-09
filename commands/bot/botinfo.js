const { Command } = require("discord.js-commando");

const package_file = require("../../package.json");

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

        return message.say({
            embed: {
                author: {
                    icon_url: bot.avatarURL,
                    name: `${bot.username}の情報`,
                },
                fields: [
                    { name: "ユーザー名", value: bot.tag, inline: true },
                    { name: "ID", value: bot.id, inline: true },
                    { name: "サーバー数", value: guilds.size, inline: true },
                    { name: "ユーザー数", value: users.size, inline: true },
                    {
                        name: "バージョン",
                        value: package_file.version,
                        inline: true,
                    },
                ],
                color: 0xb8e986,
            },
        });
    }
};
