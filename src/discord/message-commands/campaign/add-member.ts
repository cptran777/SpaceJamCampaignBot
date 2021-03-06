import { Message } from "discord.js";
import { BotCommand, CampaignCommand } from "../../constants/commands";
import { dbClient } from "../../../database/client";
import { Arguments } from "yargs";

const CHARACTER_NAME_FLAG = "character";

/**
 * Handles the add player to campaign command. Format of the command message should be:
 * !vivy campaign addplayer @PlayerName to campaignName --character characterName
 * @param args - expected arguments object for this command
 * @param message - message that triggered the command
 * @returns
 */
export async function handleCampaignAddMemberCommand(
  args: Arguments,
  message: Message
): Promise<void> {
  const requesterID = message.author.id;

  const isRequesterAllowedCommand =
    await dbClient.assign.isUserAssignedSubCommand(
      requesterID,
      `${BotCommand.Campaign}${CampaignCommand.AddMember}`
    );

  if (!isRequesterAllowedCommand) {
    message.reply(
      `Sorry, ${message.author.username}, you can't use the ${CampaignCommand.AddMember} command.`
    );
    return;
  }

  const argsList = args._;
  const campaignName = argsList[4] || argsList[3];

  if (!campaignName || typeof campaignName !== "string") {
    message.reply("I can't tell which campaign you want to add a player to...");
    return;
  }

  const member = message.mentions.users.first();

  if (!member) {
    message.reply("I can't tell who you want to add to your campaign...");
    return;
  }

  const existingCampaign = await dbClient.campaign.getCampaignByName(
    campaignName
  );

  if (!existingCampaign) {
    message.reply(`I couldn't find a campaign by the name ${campaignName}.`);
    return;
  }

  const memberID = member.id;

  if (existingCampaign.memberIDs.includes(memberID)) {
    message.reply(`${member.username} is already in your campaign.`);
    return;
  }

  const characterName = args[CHARACTER_NAME_FLAG] as string;

  // Need to also guard against blank strings so
  if (characterName && typeof characterName === "string") {
    if (existingCampaign.characters.includes(characterName)) {
      message.reply(
        `There's already a character named ${characterName} in your campaign.`
      );
      return;
    }

    existingCampaign.characters.push(characterName);
    existingCampaign.characterOwnership[memberID] = characterName;
  }

  existingCampaign.memberIDs.push(memberID);
  dbClient.campaign.saveCampaign(existingCampaign);
  message.reply(`${member.username} has been added to ${campaignName}`);
}
