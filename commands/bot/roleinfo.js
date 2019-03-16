const { Command } = require("discord.js-commando");

module.exports = class role_info extends Command {
    constructor(client) {
        super(client, {
            name: "roleinfo",
            aliases: ["rinfo", "役職情報"],
            group: "bot",
            memberName: "roleinfo",
            description: "役職の情報を表示します",
            guildOnly: true,
            args: [
                {
                    key: "role",
                    type: "role",
                    prompt: "役職名又はIDを入力してください",
                    default: "",
                },
            ],
        });
    }

    run(message, { role }) {
        if (role) {
            console.log(`-------\n${role}\n:::::::::::`);
            return message.say(role.name);
        } else {
            return message.say({
                embed: {
                    author: {
                        icon_url: message.guild.iconURL,
                        name: `${message.guild.name}の役職一覧`,
                    },
                    description: `${message.guild.roles.map(r => r.name).join("\n")}`,
                    color: 0xB8E986,
                },
                split: true,
            });
        }
    }
};
