const db = require("../../database/models/index.js");

module.exports = async (client, message) => {
    const d_user = message.author;

    const bot = await message.channel.fetchMessages({
        limit: 1,
        before: message.id,
    });
    if (bot.first().author.bot) return;
    if (!message.guild) return;

    db.point
        .findOrCreate({
            where: { user_id: d_user.id },
            defaults: {
                user_name: d_user.tag,
                user_id: d_user.id,
                point: 1,
            },
        })
        .then(pt => {
            if (pt[1]) return;
            let user_pt = pt[0].dataValues.point;
            user_pt += 1;

            db.point.update(
                {
                    user_name: d_user.tag,
                    user_id: d_user.id,
                    point: user_pt,
                },
                {
                    where: { user_id: d_user.id },
                }
            );
        });
};
