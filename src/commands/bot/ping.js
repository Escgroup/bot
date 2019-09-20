const { command } = require("ecstar");

module.exports = class extends command {
    constructor(client) {
        super(client, {
            name: "ping",
        });
    }

    run(message) {
        return message.channel.send(`${this.client.ping}ms`);
    }
};
