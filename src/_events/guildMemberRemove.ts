import { Event, Client } from 'ecstar';
import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';

export = class extends Event {
  constructor(client: Client) {
    super(client, 'guildMemberRemove');
  }

  run(member: GuildMember) {
    if (member.guild.id !== this.client.config?.server) return;

    const memberlogChannel = this.client.channels.cache.get(
      this.client.config?.channel.memberLog
    ) as TextChannel;

    memberlogChannel.send(
      new MessageEmbed()
        .setAuthor(member.guild.name, member.guild.iconURL() || '')
        .setThumbnail(member.user.avatarURL() || '')
        .addField('Name', member.user.username, true)
        .addField('ID', member.id, true)
        .addField('Member Count', member.guild.members.cache.size)
        .setFooter('退出/Exit', member.user.avatarURL() || '')
        .setColor(0xd0021b)
    );
  }
};
