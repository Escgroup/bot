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
const disconnect_log = require("./client/disconnect/index.js");
//files

bot_on = false;
client.once("ready", () => {
    ready(client, config);
    bot_on = true;
});

client.on("message", message => {
    if (message.author.bot) return;

    // message log
    message_log(client, message, config);
});

/* ログ */

// botの問題系
client.on("error", error =>
    error_log(client, error, config.channel_id, bot_on)
);
client.on("warn", warn => warn_log(client, warn, config.channel_id, bot_on));
client.on("debug", debug =>
    debug_log(client, debug, config.channel_id, bot_on)
);
client.on("disconnect", event =>
    disconnect_log(client, event, config.channel_id, bot_on)
);

client.login(config.token);
