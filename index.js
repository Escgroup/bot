const { CommandoClient } = require("discord.js-commando");

const config = require("./config/main.js");

const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: config.owner.id,
    invite: config.guild.main.url,
    unknownCommandResponse: false,
});

const message_log = require("./client/message/log.js");

client.login(config.token);

client.registry
    .registerGroups([
        ["bot", "通常のbotコマンド"],
        ["admin", "サーバー管理者コマンド"],
        ["dev", "開発者コマンド"],
    ])
    .registerDefaultTypes()
    .registerCommandsIn(`${__dirname}/commands/`);

bot_on = false;

client.on("ready", () => {
    console.log(`botを起動しました ${client.user.tag}`);
    client.user.setActivity("Commandoテスト中");
    bot_on = true;
});

/* ログ */
//message
client.on("message", message => {
    if (message.author.bot) return;
    message_log(client, message);
});
// botの問題系
client.on("error", async error => {
    if (bot_on === false) return;
    await client.channels
        .get("542909982358634496")
        .send(error)
        .catch();
});
client.on("warn", async warn => {
    if (bot_on === false) return;
    await client.channels
        .get("543039202418229248")
        .send(warn)
        .catch();
});
client.on("debug", async debug => {
    if (bot_on === false) return;
    await client.channels
        .get("543027707089387522")
        .send(debug)
        .catch();
});
client.on("disconnect", async event => {
    if (bot_on === false) return;
    await client.channels
        .get("543040492569624577")
        .send(event.code)
        .catch();
    process.exit(0);
});
