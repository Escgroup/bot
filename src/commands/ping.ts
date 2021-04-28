import { command } from 'ecstar';

export default command(() => ({
  name: 'ping',
  render({ send, client }) {
    send(`pong ${client.ws.ping}ms`);
  },
}));
