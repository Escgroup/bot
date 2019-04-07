const { Command } = require("discord.js-commando");
const cheerio = require("cheerio-httpcli");

module.exports = class search_command extends Command {
    constructor(client) {
        super(client, {
            name: "search",
            aliases: ["検索", "google"],
            group: "conv",
            memberName: "search",
            description: "Google検索をします。",
            args: [
                {
                    key: "text",
                    prompt: "検索したい内容を入力してください",
                    type: "string",
                },
            ],
        });
    }

    async run(message, { text }) {
        const edit_message = await message.channel.send(
            "<a:loading:482420749668188170> | Google検索をしています..."
        );
        if (message.guild && !message.channel.name.match(/bot/)) {
            return edit_message.edit(
                "ログが流れてしまうため、`bot`が含まれているチャンネル又はDMで利用してください。"
            );
        }

        cheerio.set("followMetaRefresh", false);

        cheerio.fetch(
            "http://www.google.com/search",
            { q: text, hl: "ja", lr: "lang_ja", num: 8 },
            (err, $) => {
                if (err) {
                    return edit_message.edit(":x: | エラーが発生しました。");
                }

                const results = [];
                /* eslint-disable　no-invalid-this */
                $("#rso .srg .g").each(function() {
                    const $h3 = $(this).find("h3");
                    const url = $(this)
                        .find(".r a")
                        .attr("href");
                    if (url) {
                        results.push({
                            title: $h3.text(),
                            url: url,
                            description: $(this)
                                .find(".st")
                                .text(),
                        });
                    }
                });

                return edit_message.edit({
                    embed: {
                        author: {
                            name: `${text} - Google 検索`,
                            url: `https://www.google.com/search?q=${text}`,
                            icon_url:
                                "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png",
                        },
                        fields: [
                            {
                                name: `${results[0].title}\n${results[0].url}`,
                                value: results[0].description,
                            },
                            {
                                name: `${results[1].title}\n${results[1].url}`,
                                value: results[1].description,
                            },
                            {
                                name: `${results[2].title}\n${results[2].url}`,
                                value: results[2].description,
                            },
                            {
                                name: `${results[3].title}\n${results[3].url}`,
                                value: results[3].description,
                            },
                            {
                                name: `${results[4].title}\n${results[4].url}`,
                                value: results[4].description,
                            },
                        ],
                        color: 0xee9468,
                    },
                });
            }
        );
    }
};
