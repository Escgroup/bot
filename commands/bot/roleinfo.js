const { Command } = require("discord.js-commando");

const permissions = {
    ADMINISTRATOR: "管理者",
    CREATE_INSTANT_INVITE: "招待を作成",
    KICK_MEMBERS: "メンバーをキック",
    BAN_MEMBERS: "メンバーをBAN",
    MANAGE_CHANNELS: "チャンネル管理",
    MANAGE_GUILD: "サーバー管理",
    ADD_REACTIONS: "リアクションの追加",
    VIEW_AUDIT_LOG: "サーバーログの表示",
    PRIORITY_SPEAKER: "優先通話",
    VIEW_CHANNEL: "チャンネル閲覧",
    READ_MESSAGES: "",
    SEND_MESSAGES: "メッセージを送信",
    SEND_TTS_MESSAGES: "TTS メッセージを送信",
    MANAGE_MESSAGES: "メッセージの管理",
    EMBED_LINKS: "埋め込みリンク",
    ATTACH_FILES: "ファイルを添付",
    READ_MESSAGE_HISTORY: "メッセージ履歴を読む",
    MENTION_EVERYONE: "全員宛メンション",
    USE_EXTERNAL_EMOJIS: "外部の絵文字の使用",
    EXTERNAL_EMOJIS: "",
    CONNECT: "接続(通話)",
    SPEAK: "発言(通話)",
    MUTE_MEMBERS: "メンバーをミュート",
    DEAFEN_MEMBERS: "メンバーのスピーカーをミュート",
    MOVE_MEMBERS: "メンバーを移動",
    USE_VAD: "音声検出の使用",
    CHANGE_NICKNAME: "ニックネームの変更",
    MANAGE_NICKNAMES: "ニックネームの管理",
    MANAGE_ROLES: "役職の管理",
    MANAGE_ROLES_OR_PERMISSIONS: "",
    MANAGE_WEBHOOKS: "WebHooksの管理",
    MANAGE_EMOJIS: "絵文字の管理",
};

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
            const r_a_p = role.serialize();
            const role_permissions = Object.keys(r_a_p)
                .filter(key => r_a_p[key] && permissions[key])
                .map(key => permissions[key])
                .join("、  ");

            const has_role = () => {
                const has_members = `${role.members.map(m => m.user.username)}`;
                if (!has_members) return "誰も所持していません";
                if (has_members.length > 500) {
                    return `${has_members.slice(0, 500)} ...`;
                } else {
                    return has_members;
                }
            };

            return message.say({
                embed: {
                    title: `${role.name}の情報`,
                    fields: [
                        { name: "役職名", value: `${role}`, inline: true },
                        { name: "ID", value: role.id, inline: true },
                        {
                            name: "所持人数",
                            value: role.members.size,
                            inline: true,
                        },
                        { name: "権限", value: `${role_permissions}` },
                        { name: "所持者", value: has_role() },
                    ],
                    color: role.color,
                },
            });
        } else {
            return message.say({
                embed: {
                    author: {
                        icon_url: message.guild.iconURL,
                        name: `${message.guild.name}の役職一覧`,
                    },
                    description: `${message.guild.roles
                        .map(r => r.name)
                        .join("\n")}`,
                    color: 0xb8e986,
                },
                split: true,
            });
        }
    }
};
