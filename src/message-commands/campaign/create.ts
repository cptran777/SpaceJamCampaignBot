import { Message } from "discord.js";
import { dbClient } from "../../database/client";
import { Arguments } from "yargs";
import { BotCommand, CampaignCommand } from "../../constants/commands";

const CAMPAIGN_NAME_FLAG = "name";
const CAMPAIGN_CURRENCY_FLAG = "currency";

/**
 * Creates a new campaign in the expected format that we can modify based on the user's flags set
 * @param name - name of the campaign to be created
 * @param ownerID - person creating the campaign
 * @returns a blank campaign canvas to work with
 */
function createEmptyCampaign(name: string, ownerID: string): ICampaign {
  return {
    name,
    ownerID,
    adminIDs: [ownerID],
    memberIDs: [],
    currency: "gold",
    money: {},
    characters: [],
    characterOwnership: {},
  };
}

export async function handleCampaignCreateCommand(
  args: Arguments,
  message: Message
): Promise<void> {
  console.log(args);
  const requesterID = message.author.id;

  const isRequesterAllowedCommand =
    await dbClient.assign.isUserAssignedSubCommand(
      requesterID,
      `${BotCommand.Campaign}${CampaignCommand.Create}`
    );

  if (!isRequesterAllowedCommand) {
    message.reply(
      `Sorry, ${message.author.username}, you can't use the ${CampaignCommand.Create} command.`
    );
    return;
  }

  const campaignName = args[CAMPAIGN_NAME_FLAG] as string;

  if (!campaignName || typeof campaignName !== "string") {
    message.reply("Your campaign needs a name...");
    return;
  }

  const campaign = createEmptyCampaign(campaignName, requesterID);

  const currency = args[CAMPAIGN_CURRENCY_FLAG] as string;

  if (currency) {
    campaign.currency = currency;
  }

  message.reply("This is only a test right now");
}
