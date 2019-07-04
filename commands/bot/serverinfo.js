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

        const user_count = () => {
            let bot_count = 0;
            let Esc_member_count = 0;
            const role_Esc = message.guild.roles.find(
                role => role.name === "[Esc] member"
            );
            message.guild.members.forEach(member => {
                if (member.user.bot) {
                    bot_count += 1;
                }
                if (member.roles.has(role_Esc.id)) {
                    Esc_member_count += 1;
                }
            });
            return `${server.members.size} (bot: ${bot_count} / [Esc]member: ${Esc_member_count})`;
        };

        const channel_count = () => {
            let channel_text = 0;
            let channel_voice = 0;
            let channel_category = 0;
            message.guild.channels.forEach(channel => {
                if (channel.type === "text") {
                    channel_text += 1;
                }
                if (channel.type === "voice") {
                    channel_voice += 1;
                }
                if (channel.type === "category") {
                    channel_category += 1;
                }
            });
            return `${message.guild.channels.size} (text: ${channel_text} / voice: ${channel_voice} / category: ${channel_category})`;
        };

        const verify_level = () => {
            const verificationLevel = message.guild.verificationLevel;
            if (verificationLevel === 0) {
                return "設定しない : 無制限";
            } else if (verificationLevel === 1) {
                return "低 : メール認証がされているアカウントのみ";
            } else if (verificationLevel === 2) {
                return "中 : Discordに登録してから5分以上経過したアカウントのみ";
            } else if (verificationLevel === 3) {
                return "(╯°□°）╯︵ ┻━┻ : このサーバーに参加してから10分以上経過したメンバーのみ";
            } else if (verificationLevel === 4) {
                return "┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻ : 電話認証がされているアカウントのみ";
            } else {
                return "エラー";
            }
        };

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
                    {
                        name: "オーナー",
                        value: server.owner.user.tag,
                        inline: true,
                    },
                    { name: "リージョン", value: server.region, inline: true },
                    { name: "ユーザ数", value: user_count() },
                    { name: "チャンネル数", value: channel_count() },
                    { name: "役職", value: server.roles.size, inline: true },
                    { name: "認証レベル", value: verify_level(), inline: true },
                ],
                footer: {
                    text: "作成日",
                },
                timestamp: server.createdAt,
                color: 0xb8e986,
            },
        });
    }
};
