import { Message } from "discord.js";
import { handleAssignCommand } from "./assign";
import { handleCampaignCommand } from "./campaign";
import { BotCommand, COMMAND_PREFIX } from "./constants";
import { getRandomLOTRQuote } from "./sam";

export function messageCommandHandler(message: Message): void {
  if (message.author.bot) return;
  if (!message.content.startsWith(COMMAND_PREFIX)) return;

  const commandBody = message.content.slice(COMMAND_PREFIX.length);
  const args = commandBody.split(' ');
  const invocation = args.shift()?.toLowerCase();

  if (invocation !== "vivy") return;

  const command = args.shift()?.toLowerCase();

  switch(command) {
    case BotCommand.Assign: handleAssignCommand(args, message); break;
    case BotCommand.Sam: getRandomLOTRQuote(message); break;
    case BotCommand.Campaign: handleCampaignCommand(args, message); break;
    default: 
      message.reply("I just want to make everyone happy with my singing.");
  }
}
