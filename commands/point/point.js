const { Command } = require("discord.js-commando");

const db = require("../../database/models/index.js");

module.exports = class point_check extends Command {
    constructor(client) {
        super(client, {
            name: "point",
            aliases: ["pt"],
            group: "point",
            memberName: "point",
            description: "発言によって得られるポイントを確認します。",
            args: [
                {
                    key: "user",
                    type: "user",
                    prompt: "ユーザー名を入力してください",
                    default: "",
                },
            ],
        });
    }

    run(message, { user }) {
        const check_pt = user_id => {
            db.point.findOne({ where: { user_id: user_id } }).then(pt => {
                return message.say(`${pt.dataValues.point}ポイント です!`);
            });
        };

        if (user) {
            check_pt(user.id);
        } else {
            check_pt(message.author.id);
        }
    }
};
