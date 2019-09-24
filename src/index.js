const Ecstar = require("ecstar");

const events_message = require("./events/message.js");

const client = new Ecstar.Client({
    prefix: "!",
});

client.on("message", message => {
    if (!message.author.bot) events_message(client, message);
});

client.login(process.env.TOKEN);
