import { Event, Client } from 'ecstar';
import {
  Message,
  TextChannel,
  WebhookMessageOptions,
  MessageEmbed,
} from 'discord.js';
import { MessageLogger } from '../functions/MessageLogger';

type WebhookOptions = WebhookMessageOptions & { split?: false | undefined };

export = class extends Event {
  logger = new MessageLogger(this.client);
  constructor(client: Client) {
    super(client, 'message');
  }
  run(message: Message) {
    if (message.author.bot) return;

    this.logger.run(message);
  }
};
