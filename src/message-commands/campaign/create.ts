import { Message } from "discord.js";
import { Arguments } from "yargs";

export async function handleCampaignCreateCommand(args: Arguments, message: Message): Promise<void> {
  console.log(args);
  message.reply("This is only a test right now");
}
