import { event } from 'ecstar';
import {
  Message,
  WebhookMessageOptions,
  MessageEmbed,
  TextChannel,
} from 'discord.js';

import { logChannelID } from '../config';

export default event(() => ({
  name: 'message',
  async run({ client, callback: [message] }) {
    if (!(message instanceof Message)) return;

    if (message.author.bot) return;

    if (!message.guild) return;

    const webhookOptions: WebhookMessageOptions = {
      username: message.author.tag,
      avatarURL: message.author.avatarURL() || '',
      disableMentions: 'all',
      embeds: [
        new MessageEmbed()
          .addField('User Tag', message.author.tag, true)
          .addField('User ID', message.author.id, true)
          .addField('Message URL', `[message URL](${message.url})`, true)
          .addField('Message ID', message.id, true)
          .addField('Channel name', message.channel, true)
          .setColor(message.member?.displayColor || 0x87909c)
          .setTimestamp(message.createdAt),
      ],
    };

    if (message.attachments) {
      webhookOptions.files = message.attachments.map(
        (attachment) => attachment.url
      );
    }

    const logChannel = client.channels.cache.get(logChannelID) as TextChannel;
    const webhook = (await logChannel.fetchWebhooks()).first();

    webhook?.send(message.content, webhookOptions);
  },
}));
