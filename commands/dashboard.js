const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "dashboard",
  async execute(client, message, args, cmd, Discord, profileData) {
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("main_button")
        .setLabel("Show Profile")
        .setStyle(ButtonStyle.Primary)
    );

    message.channel.send({ components: [button] });
  },
};
