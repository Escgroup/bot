const config = require("../../../config/main.js");
module.exports = (client, member) => {
    const server = member.guild;
    const user = member.user;
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
                text: "退出",
            },
            color: 0xd0021b,
        },
    };

    let isG = "";
    if (server.id === config.guild.main.id) {
        client.guilds.forEach(guilds => {
            try {
                guilds.members.get(user.id).edit({
                    roles: [],
                });
                isG += `${guilds.name},`;
            } catch (err) {
                isG += "";
            }
        });
    }

    if (log_channel) {
        log_channel.send(send_log_message);
        if (isG) {
            log_channel.send(`:x: | ${isG}`);
        }
    }
};
