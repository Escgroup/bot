const { Command } = require("discord.js-commando");

const config = require("../../config/main.js");

module.exports = class agree_command extends Command {
    constructor(client) {
        super(client, {
            name: "agree",
            aliases: ["認証", "同意"],
            group: "esc",
            memberName: "agree",
            guildOnly: true,
            description:
                "[Esc]™グループが提示するルール等に同意する際のコマンド。",
        });
    }

    run(message) {
        const this_server = message.guild;
        const main_server = config.guild.main.id;

        const this_channel = message.channel;

        const user = message.author;
        const member = message.member;

        const member_role = config.guild.main.role.member;

        const auto_role = user_id => {
            this.client.guilds.filter(g => {
                if (g.id === main_server) return;
                if (!g.members.has(user_id)) return;

                const g_member_role = g.roles.find(
                    role => role.name === "[Esc] member"
                );
                const g_member = g.members.get(user_id);

                g_member.addRole(g_member_role, "認証時自動付与");
                message.say(`${g.name}の認証も同時に実行しました`);
            });
        };

        if (this_server.id !== main_server)
            return message.say(
                `mainサーバーでのみ実行できるコマンドです。\n ${config.guild.main.url}`
            );

        if (!this_channel.name.match(/welcome/))
            return message.say(
                "welcomeチャンネルのみで実行できるコマンドです。"
            );

        if (member.roles.has(member_role)) {
            return message.say("認証されています。");
        } else {
            member.addRole(member_role, "認証");

            auto_role(user.id);
            return message.say("認証が完了しました。");
        }
    }
};
