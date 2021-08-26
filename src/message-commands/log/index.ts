import { Message } from "discord.js";

export async function logMessage(_args: any, message: Message): Promise<void> {
  console.log("Logging message");
  console.log(message.guild);
  // const members = await message.guild?.members.fetch();
  // console.log(members);
  message.reply("Logged");
}
