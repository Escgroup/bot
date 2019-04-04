const { Command } = require("discord.js-commando");

const db = require("../../database/models/index.js");

module.exports = class point_rank extends Command {
    constructor(client) {
        super(client, {
            name: "point-ranking",
            aliases: ["ptrank"],
            group: "point",
            memberName: "point-ranking",
            description: "ポイントの上位10名と自分のランクを表示します。",
        });
    }

    run(message) {
        db.point
            .findAll({
                order: [["point", "DESC"]],
            })
            .then(results => {
                const item = [0, "", ""];
                for (const value of results) {
                    const user = this.client.users.get(
                        value.dataValues.user_id
                    );
                    const point = value.dataValues.point;

                    item[0] += 1;

                    if (user.id === message.author.id) {
                        item[2] += `あなたのランクは ${item[0]} です！`;
                    }

                    if (item[0] <= 10)
                        item[1] += `${item[0]}: ${
                            user.username
                        } (${point}ポイント)\n`;
                }

                item[1] += `\n\n${item[2]}`;
                message.say(item[1], { code: "js" });
            });
    }
};
