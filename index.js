const { CommandoClient } = require("discord.js-commando");

const client = new CommandoClient({
    commandPrefix: ",,",
    owner: "348385393160355840",
    invite: "https://discord.gg/dBcfbxP",
    unknownCommandResponse: false,
});

const config = require("./config.js");

client.login(config.token);

client.registry
    .registerGroups([
        ["bot", "通常のbotコマンド"],
    ])
    .registerCommandsIn(`${__dirname}/commands/`);

client.on("ready", () => {
    console.log(`botを起動しました ${client.user.tag}`);
    client.user.setActivity("Commandoテスト中");
});

client.on("error", console.error);
