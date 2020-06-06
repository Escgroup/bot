import { Command, Client } from 'ecstar';
import { Message, MessageEmbed, TextChannel } from 'discord.js';

export = class extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'agree',
    });
  }

  run(message: Message) {
    if (!message.guild) return;

    const roleId = this.client.config?.roleId;

    if (message.member?.roles.cache.has(roleId)) {
      message.channel.send('認証されています。(Authenticated)');
      return;
    }

    message.member?.roles.add(roleId, '認証');

    message.channel.send('認証が完了しました。(Authentication completed)');

    const MainChannel = message.client.channels.cache.get(
      this.client.config?.channel.main
    ) as TextChannel;

    const DMChannel = message.author;

    MainChannel.send(
      new MessageEmbed({
        author: {
          name: message.author.username,
          icon_url: message.author.avatarURL() || '',
        },
        description: `${message.author.username}さんが参加しました/Joined.`,
      })
    );

    DMChannel.send(
      new MessageEmbed()
        .addField(
          '日本語',
          '認証ありがとうございます\n <#539742654561517588>で自己紹介をしていただけるとありがたいです。\n\n何か質問があればStaff、Assistantという役職をつけている方に気軽に聞いてください。'
        )
        .addField(
          'English',
          "Thank you for authentication\nI hope you'll introduce yourself here <#539742654561517588>. \n\nIf you have any questions, please feel free to ask Staff or Assistant"
        )
        .addField(
          '自己紹介テンプレ(Self-introduction template)',
          '```\n名前:\n呼び方:\n趣味・特技:\nコメント:``` \n ```\nname:\nHow to call:\nHobbies & Skills:\ncomment:```'
        )
    );
  }
};
