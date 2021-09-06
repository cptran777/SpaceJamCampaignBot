import { Message } from "discord.js";
import { BotCommand, CampaignCommand } from "../../constants/commands";
import { dbClient } from "../../database/client";
import { Arguments } from "yargs";

const FUNDS_AMOUNT_FLAG = "amount";
enum GroupFundsAction {
  ADD = "add",
  REMOVE = "remove",
}

/**
 * Handles the add group funds to campaign command. The format of the command message should be:
 * !vivy campaign addgroupfunds to campaignName --amount 123456
 * @param args - expected arguments object for this command
 * @param message - message that triggered the command
 */
export async function handleCampaignAddGroupFundsCommand(
  args: Arguments,
  message: Message
): Promise<void> {
  const { existingCampaign, amount, success } = await campaignModifyFundsChecks(
    args,
    message,
    GroupFundsAction.REMOVE
  );

  if (!success) return;

  modifyCampaignGroupFunds(
    message,
    existingCampaign as ICampaign,
    GroupFundsAction.ADD,
    amount as string | number
  );
}

/**
 * Handles the remove group funds to campaign command. The format of the command message should be:
 * !vivy campaign spendgroupfunds campaignName --amount 123456
 * @param args - expected arguments object for this command
 * @param message - message that triggered the command
 */
export async function handleCampaignRemoveGroupFundsCommand(
  args: Arguments,
  message: Message
): Promise<void> {
  const { existingCampaign, amount, success } = await campaignModifyFundsChecks(
    args,
    message,
    GroupFundsAction.REMOVE
  );

  if (!success) return;

  modifyCampaignGroupFunds(
    message,
    existingCampaign as ICampaign,
    GroupFundsAction.REMOVE,
    amount as string | number
  );
}

interface IChecksReturnValue {
  existingCampaign?: ICampaign;
  amount?: number | string;
  success: boolean;
}

async function campaignModifyFundsChecks(
  args: Arguments,
  message: Message,
  action: GroupFundsAction
): Promise<IChecksReturnValue> {
  const requesterID = message.author.id;
  const subcommand =
    action === GroupFundsAction.ADD
      ? CampaignCommand.AddGroupFunds
      : CampaignCommand.SpendGroupFunds;

  const isRequesterAllowedCommand =
    await dbClient.assign.isUserAssignedSubCommand(
      requesterID,
      `${BotCommand.Campaign}${subcommand}`
    );

  if (!isRequesterAllowedCommand) {
    message.reply(
      `Sorry, ${message.author.username}, you can't use the ${subcommand} command.`
    );
    return { success: false };
  }

  const argsList = args._;
  const campaignName = argsList[4] || argsList[3];

  if (!campaignName || typeof campaignName !== "string") {
    const actionMessage =
      action === GroupFundsAction.ADD ? "add funds to" : "remove funds from";
    message.reply(`I can't tell which campaign you want to ${actionMessage}`);
    return { success: false };
  }

  const amount = args[FUNDS_AMOUNT_FLAG] as string;
  const isAmountValid =
    amount && (typeof amount === "string" || typeof amount === "number");

  if (!isAmountValid) {
    message.reply(
      "Please specify a valid amount, with --amount number in your request"
    );
    return { success: false };
  }

  const existingCampaign = await dbClient.campaign.getCampaignByName(
    campaignName
  );

  if (!existingCampaign) {
    message.reply(`I couldn't find a campaign by the name ${campaignName}.`);
    return { success: false };
  }

  return { success: true, existingCampaign, amount };
}

async function modifyCampaignGroupFunds(
  message: Message,
  campaign: ICampaign,
  action: GroupFundsAction,
  amount: number | string
): Promise<void> {
  const parsedAmount = parseInt(amount as string);
  const currentAmount = campaign.groupFunds || 0;

  const modifiedAmount =
    action === GroupFundsAction.ADD ? parsedAmount : -parsedAmount;

  campaign.groupFunds = currentAmount + modifiedAmount;
  await dbClient.campaign.saveCampaign(campaign);

  message.reply(
    `${parsedAmount} successfully ${
      action === GroupFundsAction.ADD ? "added" : "removed"
    }`
  );
}
