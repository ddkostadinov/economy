const profileModel = require("../../models/profileSchema");
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = async (client, Discord, interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "main_button") {
      let profileData = await profileModel.findOne({
        userID: interaction.member.id,
      });
      if (!profileData) {
        let profile = await profileModel.create({
          userID: interaction.member.id,
          serverID: interaction.guild.id,
          coins: 0,
          exp: 0,
        });
        profile.save();
        return interaction.reply({
          content: `You have created your profile, please click again`,
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder()
        .setTitle("User profile")
        .setAuthor({
          name: `${interaction.member.user.username}`,
          iconURL: `${interaction.member.user.displayAvatarURL({
            extension: "png",
            dynamic: false,
          })}`,
        })
        .setColor(0x0099ff)
        .addFields(
          { name: "COINS", value: `${profileData.coins}`, inline: true },
          { name: "LEVEL", value: `${profileData.exp}`, inline: true }
        );

      interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
      console.log(profileData);
    }
  }
};
