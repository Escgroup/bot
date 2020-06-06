import { Client } from 'ecstar';

const client = new Client({
  prefix: ',,',
  config: {
    channel: {
      main: '522689755654258689',
    },
    roleId: '483849517071073284',
  },
});

client.login(process.env.TOKEN);
