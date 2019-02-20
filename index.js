const { CommandoClient } = require("discord.js-commando");

const config = require("./config/main.js");

const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: config.owner.id,
    invite: config.guild.main.url,
    unknownCommandResponse: false,
});

client.registry
    .registerGroups([
        ["bot", "通常のbotコマンド"],
        ["admin", "サーバー管理者コマンド"],
        ["dev", "開発者コマンド"],
    ])
    .registerDefaultTypes()
    .registerCommandsIn(`${__dirname}/commands/`);

//files
const ready = require("./client/ready/index.js");
const message_log = require("./client/message/log.js");

const error_log = require("./client/error/index.js");
const warn_log = require("./client/warn/index.js");
const debug_log = require("./client/debug/index.js");
//files

client.once("ready", () => {
    ready(client, config);
});

client.on("message", message => {
    if (message.author.bot) return;

    // message log
    message_log(client, message, config);
});

/* ログ */

// botの問題系
client.on("error", error => error_log(client, error, config.channel_id));
client.on("warn", warn => warn_log(client, warn, config.channel_id));
client.on("debug", debug => debug_log(client, debug, config.channel_id));
client.on("disconnect", async event => {
    if (bot_on === false) return;
    await client.channels
        .get("543040492569624577")
        .send(event.code)
        .catch();
    process.exit(0);
});

client.login(config.token);
