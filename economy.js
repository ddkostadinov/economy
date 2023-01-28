const Discord = require("discord.js");
const { Client, GatewayIntentBits } = require("discord.js");
const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command_handler", "event_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log(err);
  });

client.login(process.env.TOKEN);
