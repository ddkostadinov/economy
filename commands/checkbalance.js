const profileModel = require("../models/profileSchema");
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
  name: "checkprof",
  async execute(client, message, args, cmd, Discord, profileData) {
    const mods = ["user id"];
    for (const mod of mods) if (message.author.id !== mod) return;

    if (!args.length)
      return message.channel.send(
        "You need to mention a player to give them coins!"
      );

    const target = message.mentions.users.first();

    if (!target) return message.channel.send("User does not exist");
    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData)
        return message.channel.send(`User not found in database`);

      const embed = new EmbedBuilder()
        .setTitle("User profile")
        .setAuthor({
          name: `${target.username}`,
          iconURL: `${target.displayAvatarURL({
            extension: "png",
            dynamic: false,
          })}`,
        })
        .setColor(0x0099ff)
        .addFields(
          { name: "COINS", value: `${targetData.coins}`, inline: true },
          { name: "LEVEL", value: `${targetData.exp}`, inline: true }
        );

      return message.reply({ embeds: [embed] });
    } catch (err) {
      console.log(err);
    }
  },
};
