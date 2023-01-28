const profileModel = require("../models/profileSchema");

module.exports = {
  name: "rlvl",
  description: "Remove player level",
  async execute(client, message, args, cmd, Discord, profileData) {
    const mods = ["user id"];
    for (const mod of mods) if (message.author.id !== mod) return;

    if (!args.length)
      return message.channel.send(
        "You need to mention a player to remove their level!"
      );
    const amount = args[1];
    const target = message.mentions.users.first();
    console.log(target);
    if (!target) return message.channel.send("User does not exist");

    if (amount % 1 != 0 || amount <= 0)
      return message.channel.send("Amount must be a whole number");

    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData)
        return message.channel.send(`User not found in database`);

      await profileModel.findOneAndUpdate(
        {
          userID: target.id,
        },
        {
          $inc: {
            exp: -amount,
          },
        }
      );
      message.delete({ timeout: 5000 });
      return message.channel.send(
        `<@${message.author.id}> has removed ${amount} level/s from <@${target.id}>`
      );
    } catch (err) {
      console.log(err);
    }
  },
};
