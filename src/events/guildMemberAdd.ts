import { Event, Client } from 'ecstar';
import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';

export = class extends Event {
  constructor(client: Client) {
    super(client, 'guildMemberAdd');
  }

  run(member: GuildMember) {
    if (member.guild.id !== this.client.config?.server) return;

    const welcomeChannel = this.client.channels.cache.get(
      this.client.config?.channel.welcome
    ) as TextChannel;

    const memberlogChannel = this.client.channels.cache.get(
      this.client.config?.channel.memberLog
    ) as TextChannel;

    welcomeChannel.send(
      member.user,
      new MessageEmbed()
        .setTitle('🎉Welcome to [Esc] Group Discord Community🎉')
        .addField(
          '日本語',
          `ようこそ \`${member.user.username}\` ✨\nこのサーバーでは荒し対策の為認証を行っています\n<#${this.client.config?.channel.readme}> の内容をよく読み同意できる場合\`,agree\`と入力してください`
        )
        .addField(
          'English',
          `Welcome \`${member.user.username}\` ✨\nThis server is authenticating for troll countermeasures\nIf you can read and agree to <#${this.client.config?.channel.readm}> enter \`,agree\``
        )
    );

    memberlogChannel.send(
      new MessageEmbed()
        .setAuthor(member.displayName, member.guild.iconURL() || '')
        .setThumbnail(member.user.avatarURL() || '')
        .addField('名前', member.user.username, true)
        .addField('ID', member.user.id, true)
        .addField('サーバー人数', member.guild?.members.cache.size)
        .setFooter('参加', member.user.avatarURL() || '')
        .setColor(0x76acee)
    );
  }
};
