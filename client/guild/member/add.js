const config = require("../../../config/main.js");

module.exports = async (client, member) => {
    const server = member.guild;
    const user = member.user;
    const welcome_channel = server.channels.find(ch =>
        ch.name.match(/welcome/)
    );
    const log_channel = server.channels.find(ch => ch.name === "member-log");

    const send_log_message = {
        embed: {
            author: {
                name: server.name,
                icon_url: server.iconURL,
            },
            thumbnail: {
                url: user.avatarURL,
            },
            fields: [
                {
                    name: "名前",
                    value: user.username,
                    inline: true,
                },
                {
                    name: "ID",
                    value: user.id,
                    inline: true,
                },
                {
                    name: "サーバー人数",
                    value: server.members.size,
                },
            ],
            footer: {
                icon_url: user.avatarURL,
                text: "参加",
            },
            color: 0x76acee,
        },
    };

    if (server.id === config.guild.main.id) {
        const readme_channel = config.guild.main.channel.readme;
        welcome_channel.send(
            `${user}さん ようこそ${server.name}へ!!\n<#${readme_channel}>をよく読み同意できる場合\`,agree\`と入力してください。`
        );
    } else {
        welcome_channel.send(`${user}さん ようこそ${server.name}へ!!`);
        const main_server = client.guilds.get(config.guild.main.id);
        if (main_server.members.has(user.id)) {
            const main_member = main_server.members.get(user.id);
            const member_role = server.roles.find(
                role => role.name === "[Esc] member"
            );
            const main_member_role = config.guild.main.role.member;
            if (main_member.roles.has(main_member_role)) {
                user.addRole(member_role, "自動認証");
                welcome_channel.send(`${user.tag}自動認証しました`);
            } else {
                welcome_channel.send(
                    `${user.tag}\nmainサーバーで同意していないようです、同意をお願いします`
                );
            }
        } else {
            welcome_channel.send(
                `${user.tag}\nmainサーバーに参加し、認証されていないようです。\n荒らし対策等の観点から認証をお願いしています。(招待をDMへ送信します)`
            );
            user.send(config.guild.main.url);
        }
    }

    if (log_channel) {
        log_channel.send(send_log_message);
    }
};
