const { Event } = require("ecstar");

module.exports = class extends Event {
    constructor(client) {
        super(client, "guildMemberAdd");
    }

    run(member) {
        if (member.guild.id !== "443320971609374721") return;
        this.client.channels.get("494423151183134730").send(member.user, {
            embed: {
                title: "🎉Welcome to [Esc] Group Discord Community🎉",
                fields: [
                    {
                        name: "日本語",
                        value: `ようこそ \`${member.user.username}\` ✨
                        このサーバーでは荒し対策の為認証を行っています
                        <#541581225702195210> の内容をよく読み同意できる場合\`,agree\`と入力してください`,
                    },
                    {
                        name: "English",
                        value: `Nice to see you \`${member.user.username}\` ✨
                        This server is authenticating for troll countermeasures
                        If you can read and agree to <#541581225702195210> enter \`,agree\``,
                    },
                ],
            },
        });
        this.log(member.guild, member.user);
    }

    log(server, user) {
        this.client.channels.get("494050319508963328").send({
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
        });
    }
};
