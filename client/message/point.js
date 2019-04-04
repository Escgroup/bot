const db = require("../../database/models/index.js");

module.exports = (client, message) => {
    const d_user = message.author;

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
