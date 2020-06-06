const { Client } = require('ecstar');

const client = new Client({
  prefix: ',',
});

client.login(process.env.TOKEN);
