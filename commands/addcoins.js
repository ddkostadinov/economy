const profileModel = require("../models/profileSchema");

module.exports = {
  name: "ac",
  description: "Give player coins",
  async execute(client, message, args, cmd, Discord, profileData) {
    const mods = ["user id"];
    for (const mod of mods) if (message.author.id !== mod) return;

    if (!args.length)
      return message.channel.send(
        "You need to mention a player to give them coins!"
      );
    const amount = args[1];
    const target = message.mentions.users.first();
    if (!target) return message.channel.send("User does not exist");

    if (amount % 1 != 0 || amount <= 0)
      return message.channel.send("Deposit amount must be a whole number");

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
            coins: amount,
          },
        }
      );

      return message.channel.send(`<@${target.id}> has received their coins`);
    } catch (err) {
      console.log(err);
    }
  },
};
