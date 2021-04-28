import { event } from 'ecstar';

export default event(() => ({
  name: 'ready',
  run({ client }) {
    process.stdout.write(`ready ${client.user?.tag}`);
  },
}));
