import { Message } from "discord.js";
import yargs = require("yargs-parser");

export async function logMessage(args: any, message: Message): Promise<void> {
  console.log("Logging message");
  console.log(args);
  const testlog = yargs(args).argv;
  console.log(testlog);
  // const members = await message.guild?.members.fetch();
  // console.log(members);
  message.reply("Logged");
}
