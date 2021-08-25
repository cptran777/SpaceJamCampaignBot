import { Message } from "discord.js";
import { db } from "../../db-client";
import { BotCommand, CampaignSubCommand } from "../constants";

/**
 * Creates a standardized empty campaign to use that follows the ICampaign interface
 * @param name - name of the campaign to create
 * @param creatorID - person who created the campaign (who will be the first admin)
 * @returns an empty campaign that standardizes our expected interface for interacting with one
 */
function createEmtpyCampaign(name: string, creatorID: string): ICampaign {
  return {
    name,
    creatorID,
    adminIDs: [creatorID],
    memberIDs: [],
    currency: "gold",
    money: {},
    characters: [],
    characterOwnership: {},
  };
}

export async function handleCreateCampaignCommand(
  args: Array<string>,
  message: Message
): Promise<void> {
  const createCampaignSubCommand = `${BotCommand.Campaign}${CampaignSubCommand.Create}`;
  const requesterID = message.author.id;
  const isRequesterAllowedCommand = await db.isUserAssignedSubCommand(
    requesterID,
    createCampaignSubCommand
  );

  if (!isRequesterAllowedCommand) {
    message.reply(
      `Sorry, ${message.author.username}, you can't create new campaigns.`
    );
    return;
  }

  const campaignName = args[1];
  const campaign = createEmtpyCampaign(campaignName, requesterID);

  if (!campaignName) {
    message.reply("Your campaign needs a name.");
    return;
  }

  try {
    await db.createCampaign(campaign);
  } catch (error) {
    console.log(error);
    message.reply("I just wanted to make everyone happy with my singing...");
  }
}
