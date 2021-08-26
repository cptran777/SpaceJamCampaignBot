import Discord from "discord.js";
import { db } from "../../db-client";
import { BotCommand, CampaignSubCommand } from "../constants";
import { handleCreateCampaignCommand } from "./create-campaign";

export async function handleCampaignCommand(args: Array<string>, message: Discord.Message): Promise<void> {
  const requesterID = message.author.id;
  const isRequesterAllowedCommand = await db.isUserAssignedCommand(requesterID, BotCommand.Campaign);

  if (!isRequesterAllowedCommand) {
    message.reply(`Sorry, ${message.author.username}, you can't use the ${BotCommand.Campaign} command.`);
    return;
  }
  
  const subCommand = args[0] as CampaignSubCommand;

  switch (subCommand) {
    case CampaignSubCommand.Create: handleCreateCampaignCommand(args, message); break;
    default:
      message.reply("I don't recognize that command for campaigns");
  }
}