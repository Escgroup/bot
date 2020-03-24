const { Event } = require('ecstar');

module.exports = class extends Event {
  constructor(client) {
    super(client, 'message');
  }

  run(message) {
    if (message.author.bot) return;
    this.options = {
      username: message.author.tag,
      avatarURL: message.author.avatarURL,
    };

    this.message = message;

    this.sets(message);

    this.send(message.cleanContent, this.options);
  }

  sets(message) {
    this.attachment(message);
    if (message.guild) {
      this.guild(message);
    } else {
      this.DM(message);
    }
  }

  attachment(message) {
    if (message.attachments.first()) {
      this.options.file = message.attachments.first().url;
    }
  }

  guild(message) {
    const defaultColor = 0x87909c;
    this.options.embeds = [
      {
        fields: [
          {
            name: 'User Tag',
            value: message.author.tag,
            inline: true,
          },
          {
            name: 'User ID',
            value: message.author.id,
            inline: true,
          },
          {
            name: 'Message URL',
            value: `[message URL](${message.url})`,
            inline: true,
          },
          {
            name: 'Message ID',
            value: message.id,
            inline: true,
          },
          {
            name: 'Server name',
            value: message.guild.name,
            inline: true,
          },
          {
            name: 'Channel name',
            value: `<#${message.channel.id}>`,
            inline: true,
          },
        ],
        color: message.member.displayColor || defaultColor,
        timestamp: message.createdAt,
      },
    ];
  }

  DM(message) {
    this.options.embeds = [
      {
        footer: {
          text: 'DM',
        },
        timestamp: message.createdAt,
      },
    ];
  }

  send(text, options) {
    this.message.client.channels.cache
      .get('625989592369332236')
      .fetchWebhooks()
      .then((hooks) => {
        hooks.first().send(text, options);
      });
  }
};
