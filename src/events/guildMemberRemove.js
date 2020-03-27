const { Event } = require('ecstar');

module.exports = class extends Event {
  constructor(client) {
    super(client, 'guildMemberRemove');
  }

  run(member) {
    if (member.guild.id !== '443320971609374721') return;

    const server = member.guild;
    const { user } = member;
    member.client.channels.cache.get('494050319508963328').send({
      embed: {
        author: {
          name: server.name,
          icon_url: server.iconURL,
        },
        thumbnail: {
          url: user.avatarURL(),
        },
        fields: [
          {
            name: '名前',
            value: user.username,
            inline: true,
          },
          {
            name: 'ID',
            value: user.id,
            inline: true,
          },
          {
            name: 'サーバー人数',
            value: server.members.cache.size,
          },
        ],
        footer: {
          icon_url: user.avatarURL(),
          text: '退出',
        },
        color: 0xd0021b,
      },
    });
  }
};
