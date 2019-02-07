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
    .registerGroups([["bot", "通常のbotコマンド"]])
    .registerCommandsIn(`${__dirname}/commands/`);

client.on("ready", () => {
    console.log(`botを起動しました ${client.user.tag}`);
    client.user.setActivity("Commandoテスト中");
});

//loging
client.on("error", error => {
    client.channels.get("542909982358634496").send(error);
});
client.on("warn", warn => {
    client.channels.get("543039202418229248").send(warn);
});
client.on("debug", debug => {
    client.channels.get("543027707089387522").send(debug);
});
client.on("disconnect", event => {
    client.channels.get("543040492569624577").send(event.code);
});
