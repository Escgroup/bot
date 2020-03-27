const { Event } = require('ecstar');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {
  constructor(client) {
    super(client, 'guildMemberAdd');
  }

  run(member) {
    const readmeChannel = '638280071999913994';

    if (member.guild.id !== '443320971609374721') return;

    member.client.channels.cache.get('494423151183134730').send(
      member.user,
      new MessageEmbed()
        .setTitle('🎉Welcome to [Esc] Group Discord Community🎉')
        .addField(
          '日本語',
          `ようこそ \`${member.user.username}\` ✨
                        このサーバーでは荒し対策の為認証を行っています
                        <#${readmeChannel}> の内容をよく読み同意できる場合\`,agree\`と入力してください`
        )
        .addField(
          'English',
          `Nice to see you \`${member.user.username}\` ✨
                        This server is authenticating for troll countermeasures
                        If you can read and agree to <#${readmeChannel}> enter \`,agree\``
        )
    );
    this.log(member.guild, member.user);
  }

  log(server, user) {
    server.client.channels.cache
      .get('494050319508963328')
      .send(
        new MessageEmbed()
          .setAuthor(server.name, server.iconURL)
          .setThumbnail(user.avatarURL())
          .addField('名前', user.username, true)
          .addField('ID', user.id, true)
          .addField('サーバー人数', server.members.cache.size)
          .setFooter('参加', user.avatarURL())
          .setColor(0x76acee)
      );
  }
};
