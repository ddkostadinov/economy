const profileModel = require("../../models/profileSchema");

module.exports = async (client, Discord, member) => {
  let profile = await profileModel.create({
    userID: member.user.id,
    serverID: member.guild.id,
    coins: 0,
    exp: 0,
  });
  profile.save();
};
