require('dotenv').config()
// To ensure that we do not mistype process.env variables, which are essentially "any" keys
const PROCESS_ENV = process.env as NodeJS.ProcessEnv & IEnvironmentVariables;

import discord = require("discord.js");
import { messageCommandHandler } from "./message-commands/handler";

const { Client, Intents } = discord;
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("ready", () => { console.log(`Logged in as ${client.user!.tag}!`) });

client.on("messageCreate", messageCommandHandler);

client.login(PROCESS_ENV.BOT_TOKEN);

/**
const config = require('./config.json');
const { Client, Intents } = require('discord.js');


const prefix = "!";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }

  if (interaction.commandName === 'dicks') {
    await interaction.reply('Deez nuts');
  }
});

client.on("messageCreate", function(message) { 
  console.log(message);
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "sam" && message.author.id === config.MATT_ID) {
    const quotes = require("./quotes.json").quotes;
    message.reply(quotes[Math.floor(Math.random() * quotes.length)]);
  }
  
  if (message.author.id !== config.ADMIN_ID) return;
  
  if (command === "dicks") {
    console.log(args);

    if (args[0] === "response") {
      message.reply("Got eem");
    } else {
      message.reply("Deez nuts");
    }
    
    return;           
  }
});             

client.login(config.BOT_TOKEN);

 */