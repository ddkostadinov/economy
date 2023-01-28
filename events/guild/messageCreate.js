const profileModel = require("../../models/profileSchema");

module.exports = async (client, Discord, message) => {
  const prefix = process.env.PREFIX;
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  let profileData;
  try {
    profileData = await profileModel.findOne({ userID: message.author.id });
    if (!profileData) {
      let profile = await profileModel.create({
        userID: message.author.id,
        serverID: message.guild.id,
        coins: 0,
        exp: 0,
      });
      profile.save();
    }
  } catch (err) {
    console.log(err);
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();
  const command = client.commands.get(cmd);

  try {
    command.execute(client, message, args, cmd, Discord, profileData);
  } catch (err) {
    message.reply("There was an error executing this command!");
    console.log(err);
  }
};
