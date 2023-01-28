module.exports = {
  name: "profile",
  async execute(client, message, args, cmd, Discord, profileData) {
    if (!profileData) {
      return message.reply(
        `Your profile has been created, please try again now ${
          message.author.tag.split("#")[0]
        }`
      );
    }
    message.reply({
      content: `You have ${profileData.coins} coins, your level is ${profileData.exp}`,
      ephemeral: true,
    });
  },
};
