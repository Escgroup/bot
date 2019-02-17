const { Command } = require("discord.js-commando");

const disambiguation = items => {
    const item_list = items.map(item => `\`${item["name"]}\``).join(",");
    return `いくつかのコマンドが見つかりました、詳しく入力してください。
(もしかして : ${item_list})`;
};

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            group: "bot",
            aliases: ["commands"],
            memberName: "help",
            description: "helpを表示します",
            args: [
                {
                    key: "command",
                    prompt: "どのようなコマンドのヘルプを表示しますか？",
                    type: "string",
                    default: "",
                },
            ],
        });
    }

    run(message, args) {
        const groups = this.client.registry.groups;
        const commands = this.client.registry.findCommands(
            args.command,
            false,
            message
        );
        const showAll = args.command && args.command.toLowerCase() === "all";

        if (args.command && !showAll) {
            if (commands.length === 1) {
                let help = {
                    embed: {
                        title: `__**${commands[0].name}**__ コマンドの説明`,
                        description: `${commands[0].description}${
                            commands[0].guildOnly ? " (サーバーのみ)" : ""
                        }${commands[0].nsfw ? " (NSFW)" : ""}`,
                        fields: [
                            {
                                name: "使い方",
                                value: `${this.client.commandPrefix}${
                                    commands[0].name
                                } ${
                                    commands[0].format
                                        ? ` ${commands[0].format}`
                                        : ""
                                }`,
                            },
                        ],
                        color: 0xf5a623,
                    },
                };
                if (commands[0].aliases.length > 0)
                    help.embed.fields.push({
                        name: "エイリアス",
                        value: commands[0].aliases.join(", "),
                    });
                if (commands[0].details)
                    help.embed.fields.push({
                        name: "詳細",
                        value: commands[0].details,
                    });
                if (commands[0].examples)
                    help.embed.fields.push({
                        name: "例",
                        value: commands[0].examples.join("\n"),
                    });

                message
                    .say(
                        `<a:loading:482420749668188170> | ${
                            commands[0].name
                        }のヘルプを DM に送信しています...`
                    )
                    .then(edit_message =>
                        message.author
                            .send(help)
                            .then(() => {
                                edit_message.edit(
                                    `:envelope_with_arrow: | ${
                                        commands[0].name
                                    }コマンドのヘルプを DM に送信しました`
                                );
                            })
                            .catch(() => {
                                edit_message.edit(
                                    ":x: | DM へのメッセージ送信に失敗しました。" +
                                        "「サーバーにいるメンバーからのダイレクトメッセージを許可する」が無効になっている場合、" +
                                        "有効にするとこの問題が解決されます"
                                );
                            })
                    );
                return;
            } else if (commands.length > 15) {
                return message.say(
                    "たくさんのコマンドが見つかりました、詳しく入力してください"
                );
            } else if (commands.length > 1) {
                return message.say(disambiguation(commands));
            } else {
                return message.say(
                    `コマンドが見つかりませんでした。\`${
                        this.client.commandPrefix
                    }help\`と入力して確認してください`
                );
            }
        }
    }
};
