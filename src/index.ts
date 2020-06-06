import { Client } from 'ecstar';

const client = new Client({
  prefix: ',,',
  config: {
    channel: {
      main: '522689755654258689',
      message_log: '625989592369332236',
    },
    roleId: '483849517071073284',
  },
});

client.login(process.env.TOKEN);
