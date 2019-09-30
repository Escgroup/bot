const Ecstar = require("ecstar");

const client = new Ecstar.Client({
    prefix: ",",
});

client.login(process.env.TOKEN);
