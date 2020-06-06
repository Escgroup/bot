const { Command } = require('ecstar');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'agree',
    });
  }

  run(message) {
    if (!message.guild) return;

    const roleId = '483849517071073284';

    if (message.member.roles.cache.has(roleId)) {
      message.channel.send('認証されています。(Authenticated)');
      return;
    }

    message.member.roles.add(roleId, '認証');

    this.DM(message);

    message.channel.send('認証が完了しました。(Authentication completed)');

    message.client.channels.cache.get('522689755654258689').send({
      embed: {
        author: {
          name: message.author.username,
          icon_url: message.author.avatarURL(),
        },
        description: `${message.author.username}さんが参加したよ 🙂
                ${message.author.username} joined 🙂`,
      },
    });
  }

  DM(message) {
    message.author.send({
      embed: {
        fields: [
          {
            name: '日本語',
            value: `認証ありがとうございます🙂
                        <#539742654561517588>で自己紹介をしていただけるとありがたいです

                        何か質問があればStaff、Assistantという役職をつけている方に気軽に聞いてください。`,
          },
          {
            name: 'English',
            value: `Thank you for authentication🙂
                        I would be grateful if you could introduce yourself <#539742654561517588>

                        If you have any questions, please feel free to ask Staff or Assistant `,
          },
          {
            name: '自己紹介テンプレ(Self-introduction template)',
            value:
              '```\n名前:\n呼び方:\n趣味・特技:\nコメント:```' +
              '```\nname:\nHow to call:\nHobbies & Skills:\ncomment:```',
          },
        ],
      },
    });
  }
};
