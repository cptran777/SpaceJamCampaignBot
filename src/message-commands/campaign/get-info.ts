import { Message } from "discord.js";
import { BotCommand } from "../../constants/commands";
import { dbClient } from "../../database/client";
import { Arguments } from "yargs";
import pluralize = require("pluralize");

/**
 * Handles the add group funds to campaign command. The format of the command message should be:
 * !vivy campaign getgroupfunds campaignName
 * @param args - expected arguments object for this command
 * @param message - message that triggered the command
 */
export async function handleGetGroupFundsCommand(
  args: Arguments,
  message: Message
): Promise<void> {
  const requesterID = message.author.id;
  // For getters, let's let anyone be able to do that if they at least have access to the campaign
  // command and are part of the compaign
  const isRequesterAllowedCommand = await dbClient.assign.isUserAssignedCommand(
    requesterID,
    BotCommand.Campaign
  );

  if (!isRequesterAllowedCommand) {
    message.reply(
      `Sorry, ${message.author.username}, you can't use the ${BotCommand.Campaign} command.`
    );
    return;
  }

  const argsList = args._;
  const campaignName = argsList[2];

  if (!campaignName || typeof campaignName !== "string") {
    message.reply(`I can't tell which campaign you want to see funds for.`);
    return;
  }

  const existingCampaign = await dbClient.campaign.getCampaignByName(
    campaignName
  );

  if (!existingCampaign) {
    message.reply(`I couldn't find a campaign by the name ${campaignName}.`);
    return;
  }

  const membersAndAdmins = existingCampaign.memberIDs.concat(
    existingCampaign.adminIDs
  );

  if (!membersAndAdmins.includes(requesterID)) {
    message.reply(
      `Sorry, ${message.author.username}, you have to be a player or admin of this campaign to get that info`
    );
    return;
  }

  const funds = existingCampaign.groupFunds || 0;
  message.reply(
    `You have ${funds} ${pluralize(existingCampaign.currency, funds)}`
  );
}
