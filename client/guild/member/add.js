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

    if (guild.id === config.guild.main.id) {
        const readme_channel = config.guild.main.channel.readme;
        welcome_channel.send(
            `${user}さん ようこそ${
                server.name
            }へ!!\n${readme_channel}をよく読み同意できる場合\`,agree\`と入力してください。`
        );
    } else {
        welcome_channel.send(`${user}さん ようこそ${server.name}へ!!`);
        const main_server = client.guilds.get(config.guild.main.id);
        const member_role = server.roles.find(r => r.name === "[Esc] member");
        const main_member = await main_server.members.get(user.id).catch(() => {
            return welcome_channel.send("mainにいない");
        });
        const main_member_role = config.guild.main.role.member;
        if (main_member.roles.has(main_member_role)) {
            user.addRole(member_role);
            welcome_channel.send(`${user.tag}自動認証しました`);
        }else{
            welcome_channel.send(`${user}メインサーバーで同意していないようです、同意をお願いします`);
        }
    }

    if (log_channel) {
        log_channel.send(send_log_message);
    }
};
