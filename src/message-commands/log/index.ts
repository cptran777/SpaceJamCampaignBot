import { Message } from "discord.js";

export function logMessage(message: Message): void {
  console.log(message);
  console.log(message.guild);
  message.reply("Logged");
}
