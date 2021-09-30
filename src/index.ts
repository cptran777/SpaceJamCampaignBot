require("dotenv").config();

import discord = require("discord.js");
import { messageCommandHandler } from "./discord/message-commands";
import { IEnvironmentVariables } from "./types/environment";

// To ensure that we do not mistype process.env variables, which are essentially "any" keys
const PROCESS_ENV = process.env as NodeJS.ProcessEnv & IEnvironmentVariables;

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
