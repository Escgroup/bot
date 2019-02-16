const { Command } = require("discord.js-commando");

module.exports = class EvalCommand extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            group: "dev",
            memberName: "eval",
            description: "evalを実行します",
            ownerOnly: true,
            args: [
                {
                    key: "code",
                    prompt: "実行したいコードを入力してください",
                    type: "string",
                },
            ],
        });
    }

    run(message, { code }) {
        const eval_log_channel = this.client.channels.get("543309242933968906");

        try {
            const evaled = eval(code);

            message.say(evaled);

            const embed = {
                title: ":o:",
                color: 0x4a90e2,
                fields: [
                    { name: "code", value: code },
                    { name: "結果", value: `${evaled}` },
                ],
                timestamp: new Date(),
            };

            eval_log_channel.send({ embed });
        } catch (error) {
            message.say(":x: | エラーが発生しました");

            const embed = {
                title: ":x:",
                color: 0xd0021b,
                fields: [
                    { name: "code", value: code },
                    { name: "エラー", value: `${error.stack}` },
                ],
                timestamp: new Date(),
            };

            eval_log_channel.send({ embed });
        }

        return;
    }
};
