const { Command } = require("discord.js-commando");

module.exports = class server_ping_command extends Command {
    constructor(client) {
        super(client, {
            name: "serverinfo",
            aliases: ["sinfo", "サーバー情報"],
            group: "bot",
            memberName: "serverinfo",
            description: "サーバーの情報を表示します",
            guildOnly: true,
        });
    }

    run(message) {
        const server = message.guild;
        return message.say({
            embed: {
                author: {
                    icon_url: server.iconURL,
                    name: `${server.name}の情報`,
                },
                thumbnail: {
                    url: server.iconURL,
                },
                fields: [
                    { name: "サーバー名", value: server.name, inline: true },
                    { name: "ID", value: server.id, inline: true },
                ],
            },
        });
    }
};
