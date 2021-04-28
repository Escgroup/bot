import { command } from 'ecstar';

const roleID = '483849517071073284';

export default command(() => ({
  name: 'agree',
  render({ send, message }) {
    if (message.member?.roles.cache.has(roleID)) {
      return send('認証されています。(Authenticated)');
    } else {
      return send('no');
    }
  },
}));
