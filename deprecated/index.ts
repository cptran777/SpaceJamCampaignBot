require("dotenv").config();
// To ensure that we do not mistype process.env variables, which are essentially "any" keys
const PROCESS_ENV = process.env as NodeJS.ProcessEnv & IEnvironmentVariables;

import discord = require("discord.js");
import { messageCommandHandler } from "./message-commands/handler";

const { Client, Intents } = discord;
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user!.tag}!`);
});

client.on("messageCreate", messageCommandHandler);

client.login(PROCESS_ENV.BOT_TOKEN);

/**
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }

  if (interaction.commandName === 'dicks') {
    await interaction.reply('Deez nuts');
  }
});
 */

// We are creating an express server to stop heroku from killing the app
// Can remove once we change to a worker dyno
// Or maybe we'll just keep this and have a web interface too
const express = require("express");
const app = express();

const http = require("http").createServer(app);

const port = process.env.PORT || 3005;
http.listen(port, () => {
  console.log("Listening on port", port);
});