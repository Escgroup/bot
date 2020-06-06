import { Command, Client } from 'ecstar';
import { Message } from 'discord.js';

export = class extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'ping',
    });
  }

  run(message: Message) {
    return message.channel.send(`${message.client.ws.ping}ms`);
  }
};
