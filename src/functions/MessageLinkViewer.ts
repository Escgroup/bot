import { Client, print } from 'ecstar';
import { Message, TextChannel } from 'discord.js';

export class MessageLinkViewer {
  constructor(public client: Client) {}
  run(message: Message) {
    /*
     * reference the code : 
     * https://github.com/InkoHX/discord-link-viewer/blob/71b926fe88f5430458df7debb55c7b654517a8d6/index.js
     */

    const URL_PATTERN = /http(?:s)?:\/\/(?:.*)?discord(?:app)?\.com\/channels\/(?:\d{17,19})\/(?<channelId>\d{17,19})\/(?<messageId>\d{17,19})/g;
    let result: RegExpExecArray | null;

    while ((result = URL_PATTERN.exec(message.content)) !== null) {
      const group = result.groups;

      if (!group) return;

      this.client.channels
        .fetch(group.channelId)
        .then((channel) =>
          (channel as TextChannel).messages.fetch(group.messageId)
        )
        .then((targetMessage) =>
          message.channel.send(targetMessage.cleanContent, [
            ...targetMessage.attachments.values(),
            ...targetMessage.embeds,
          ])
        )
        .catch((error) => print.warn(`MessageLinkViewerError: ${error}`));
    }
  }
}
