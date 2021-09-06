import { Message } from "discord.js";
import { dbClient } from "../../database/client";
import { Arguments } from "yargs";
import { BotCommand, CampaignCommand } from "../../constants/commands";
import { handleCampaignCreateCommand } from "./create";
import { handleCampaignAddMemberCommand } from "./add-member";
import {
  handleCampaignAddGroupFundsCommand,
  handleCampaignRemoveGroupFundsCommand,
} from "./modify-funds";
import { handleGetGroupFundsCommand } from "./get-info";

export async function handleCampaignCommand(
  args: Arguments,
  message: Message
): Promise<void> {
  const requesterID = message.author.id;

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

  // Expected: ["campaign", "create"]
  const argsList = args._;

  const subCommand = argsList[1];

  switch (subCommand) {
    case CampaignCommand.Create:
      handleCampaignCreateCommand(args, message);
      break;
    case CampaignCommand.AddMember:
      handleCampaignAddMemberCommand(args, message);
      break;
    case CampaignCommand.AddGroupFunds:
      handleCampaignAddGroupFundsCommand(args, message);
      break;
    case CampaignCommand.SpendGroupFunds:
      handleCampaignRemoveGroupFundsCommand(args, message);
      break;
    case CampaignCommand.GetGroupFunds:
      handleGetGroupFundsCommand(args, message);
      break;
    default:
      message.reply(
        "Sorry, I don't know what you want me to do with that campaign"
      );
  }
}
