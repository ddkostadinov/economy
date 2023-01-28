module.exports = {
  name: "ping",
  description: "ping command",
  async execute(client, message, args, Discord) {
    message.channel.send("pong!");
  },
};
