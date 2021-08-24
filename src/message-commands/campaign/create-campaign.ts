import { Message } from "discord.js";
import { db } from "../../db-client";
import { BotCommand, CampaignSubCommand } from "../constants";

function createEmtpyCampaign(name: string, creatorID: string): ICampaign {
  return {
    name,
    creatorID,
    adminIDs: [creatorID],
    memberIDs: [],
    currency: "gold",
    money: {}
  }
}

export async function handleCreateCampaignCommand(args: Array<string>, message: Message): Promise<void> {
  const createCampaignSubCommand = `${BotCommand.Campaign}${CampaignSubCommand.Create}`;
  const requesterID = message.author.id;
  const isRequesterAllowedCommand = await db.isUserAssignedSubCommand(requesterID, createCampaignSubCommand);

  if (!isRequesterAllowedCommand) {
    message.reply(`Sorry, ${message.author.username}, you can't create new campaigns.`);
    return;
  }

  console.log(args);
  console.log(createEmtpyCampaign("Sexy robot", requesterID));

  const campaignName = args[1];
  message.reply("I can try to create that...");
}
