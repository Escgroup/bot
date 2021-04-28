import { event } from 'ecstar';
import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';

const memberlogChanneliD = '620149019896840192';

export default event(() => ({
  name: 'guildMemberAdd',
  run({ client, callback: [member] }) {
    const memberlogChannel = client.channels.cache.get(
      memberlogChanneliD
    ) as TextChannel;

    if (member instanceof GuildMember) {
      memberlogChannel.send(
        new MessageEmbed()
          .setAuthor(member.displayName, member.guild.iconURL() || '')
          .setThumbnail(member.user.avatarURL() || '')
          .addField('Name', member.user.username, true)
          .addField('ID', member.user.id, true)
          .addField('Member Count', member.guild?.members.cache.size)
          .setFooter('参加/Join', member.user.avatarURL() || '')
          .setColor(0x76acee)
      );
    }
  },
}));
