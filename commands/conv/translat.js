const { Command } = require("discord.js-commando");

const config = require("../../config/main");
const request = require("request");

module.exports = class translate_command extends Command {
    constructor(client) {
        super(client, {
            name: "translate",
            aliases: ["tr", "翻訳"],
            group: "conv",
            memberName: "translate",
            description: "Google翻訳をします。",
            args: [
                {
                    key: "lang",
                    prompt: "言語コードを入力してください(en,ja等)",
                    type: "string",
                },
                {
                    key: "text",
                    prompt: "翻訳したい文字列を入力してください。",
                    type: "string",
                },
            ],
        });
    }

    async run(message, args) {
        const edit_message = await message.channel.send(
            "<a:loading:482420749668188170> | Google翻訳をしています..."
        );

        const url = config.api.translate;

        request.get(
            {
                url: url,
                qs: {
                    text: args.text,
                    sl: "",
                    tl: args.lang,
                },
            },
            (error, response, body) => {
                if (error)
                    return edit_message.edit(":x: | エラーが発生しました。");

                if (body.startsWith("<!DOCTYPE html>")) {
                    edit_message.edit(
                        ":x: | 言語コードが違う可能性があります。(en,ja等)"
                    );
                } else {
                    edit_message.edit({
                        embed: {
                            author: {
                                name: "Google翻訳",
                                url: `https://translate.google.co.jp/&sl=auto&tl=${args.lang}&text=${args.text}`,
                                icon_url:
                                    "https://img.icons8.com/color/48/000000/google-translate.png",
                            },
                            title: `自動検出=>${args.lang}`,
                            fields: [
                                { name: "翻訳前の内容", value: args.text },
                                { name: "翻訳後の内容", value: body },
                            ],
                            color: 0x4a90e2,
                        },
                    });
                }
            }
        );
    }
};
