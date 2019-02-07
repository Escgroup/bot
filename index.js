const { CommandoClient } = require("discord.js-commando");

const message_log = require("./client/message/log.js");

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

/* ログ */
//message
client.on("message", message => {
    if (message.author.bot) return;
    message_log(client, message);
});
// botの問題系
client.on("error", async error => {
    await client.channels
        .get("542909982358634496")
        .send(error)
        .catch();
});
client.on("warn", async warn => {
    await client.channels
        .get("543039202418229248")
        .send(warn)
        .catch();
});
client.on("debug", async debug => {
    await client.channels
        .get("543027707089387522")
        .send(debug)
        .catch();
});
client.on("disconnect", async event => {
    await client.channels
        .get("543040492569624577")
        .send(event.code)
        .catch();
    process.exit(0);
});
