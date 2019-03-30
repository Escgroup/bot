const { CommandoClient } = require("discord.js-commando");

const client_module = require("./client/import.js");

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
        ["esc", "[Esc]™グループコマンド"],
        ["conv", "便利コマンド"],
        ["admin", "サーバー管理者コマンド"],
        ["staff", "スタッフ専用コマンド"],
        ["dev", "開発者コマンド"],
    ])
    .registerDefaultTypes()
    .registerCommandsIn(`${__dirname}/commands/`);

bot_on = false;
client.once("ready", () => {
    client_module.ready.index(client, config);
    bot_on = true;
});

client.on("message", message => {
    if (message.author.bot) return;

    // message log
    client_module.message.log(client, message, config);
});

client.on("messageDelete", message => {
    if (message.author.bot || !message.guild) return;

    // message_delete log
    client_module.message.delete(client, message, config);
});
client.on("messageUpdate", (oldMessage, newMessage) => {
    if (
        (oldMessage.author.bot && newMessage.author.bot) ||
        (!oldMessage.guild && !newMessage.guild)
    )
        return;

    // message_update log
    client_module.message.update(client, oldMessage, newMessage, config);
});

client.on("guildMemberAdd", member => client_module.guild.member.add(client, member));
client.on("guildMemberRemove", member => client_module.guild.member.remove(client, member));

// botの問題系
client.on("error", error =>
    client_module.error.index(client, error, config.channel_id, bot_on)
);
client.on("warn", warn =>
    client_module.warn.index(client, warn, config.channel_id, bot_on)
);
client.on("debug", debug =>
    client_module.debug.index(client, debug, config.channel_id, bot_on)
);
client.on("disconnect", event =>
    client_module.connect.disconnect(client, event, config.channel_id, bot_on)
);
client.on("reconnecting", () =>
    client_module.connect.reconnecting(client, config.channel_id, bot_on)
);

client.login(config.token);
