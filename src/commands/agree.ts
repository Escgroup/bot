import { command } from 'ecstar';
import { roleID } from '../config';

export default command(() => ({
  name: 'agree',
  async render({ send, message }) {
    if (message.member?.roles.cache.has(roleID)) {
      return send('認証されています。(Authenticated)');
    }

    try {
      await message.member?.roles.add(roleID, '認証');
      message.channel.send('認証が完了しました。(Authentication completed)');
    } catch (err) {
      console.error(err);
      send(
        'エラーが発生しました、もう一度試してエラーが発生したらStaffに声をかけてください。'
      );
    }
  },
}));
