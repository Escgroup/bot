const { Command } = require("discord.js-commando");

module.exports = class ReloadCommand extends Command {
    constructor(client) {
        super(client, {
            name: "reload",
            group: "dev",
            memberName: "reload",
            description: "コマンドを再度読み込みします。",
            ownerOnly: true,
            guarded: true,
            args: [
                {
                    key: "command_or_group",
                    label: "command/group",
                    prompt:
                        "リロードしたいコマンドまたはコマンドグループを指定してください。",
                    type: "group|command",
                },
            ],
        });
    }

    async run(message, { command_or_group }) {
        const is_command = Boolean(command_or_group.groupID);
        command_or_group.reload();

        if (this.client.shard) {
            await this.client.shard
                .broadcastEval(
                    `
            if(this.shard.id !== ${this.client.shard.id}){
                this.registry.${isCmd ? "commands" : "groups"}.get("
                ${is_command ? cmdOrGrp.name : cmdOrGrp.id}").reload();
            }`
                )
                .then(() => {
                    return message.say(
                        `:o: | ${command_or_group} のリロードを完了しました`
                    );
                })
                .catch(error => {
                    this.client.emit(
                        "warn",
                        "Error when broadcasting command reload to other shards"
                    );
                    this.client.emit("error", error);
                    return cmessage.say(
                        `:x: | ${command_or_group.name} のリロードに失敗しました`
                    );
                });
        } else {
            return message.say(
                `:o: | ${
                    is_command
                        ? command_or_group.name
                        : `${command_or_group.id}(${command_or_group.name})`
                } のリロードを完了しました`
            );
        }
    }
};
