"use strict";
module.exports = (sequelize, DataTypes) => {
    const point = sequelize.define(
        "point",
        {
            user_name: DataTypes.STRING,
            user_id: DataTypes.STRING,
            point: DataTypes.INTEGER,
        },
        { freezeTableName: true }
    );
    // point.associate = function() {
    //     // function(models)
    // };
    return point;
};
