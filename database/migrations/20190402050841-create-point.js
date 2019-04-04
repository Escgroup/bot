"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("points", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_name: {
                type: Sequelize.STRING,
            },
            user_id: {
                type: Sequelize.STRING,
            },
            point: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        console.log(Sequelize);
        return queryInterface.dropTable("point");
    },
};
