const { Command } = require("discord.js-commando");

module.exports = class user_info extends Command {
    constructor(client) {
        super(client, {
            name: "userinfo",
            group: "bot",
            memberName: "userinfo",
            description: "ユーザーの情報を表示します",
        });
    }

    run(message) {
        
    }
};
