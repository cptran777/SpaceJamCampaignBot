import { BotCommand } from "src/message-commands/constants";
import path = require("path");
import { writeFile } from "./utils";

const lotrQuotes = require("../../db/quotes.json");
const ASSIGNED_COMMANDS_DB = path.join(process.cwd(), "db/tables/assigned-commands.json");
const ASSIGNED_SUB_COMMANDS_DB = path.join(process.cwd(), "db/tables/assigned-subcommands.json");
const CAMPAIGNS_DB = path.join(process.cwd(), "db/tables/campaigns.json");

async function getLOTRQuotes(): Promise<Array<string>> {
  // Faking async-ness
  const quotes = await lotrQuotes.quotes;
  return quotes;
}

async function assignCommand(userID: string, command: BotCommand): Promise<void> {
  const assignedCommands = require(ASSIGNED_COMMANDS_DB) as Partial<Record<BotCommand, Array<string>>>;
  
  if (!assignedCommands[command]) {
    assignedCommands[command] = [];
  }

  if (!assignedCommands[command]?.includes(userID)) {
    assignedCommands[command]?.push(userID);
  }

  // Faking async-ness since this would be a db call here
  await writeFile(ASSIGNED_COMMANDS_DB, JSON.stringify(assignedCommands, null, 4));
}

async function removeAssignedCommand(userID: string, command: BotCommand): Promise<void> {
  const assignedCommands = require(ASSIGNED_COMMANDS_DB) as Partial<Record<BotCommand, Array<string>>>;

  if (!assignedCommands[command]) return;

  assignedCommands[command] = assignedCommands[command]?.filter(item => item !== userID);
  await writeFile(ASSIGNED_COMMANDS_DB, JSON.stringify(assignedCommands, null, 4));
}

async function isUserAssignedCommand(userID: string, command: BotCommand): Promise<boolean> {
  // Faking the fetch part from the DB
  const assignedCommands = await require(ASSIGNED_COMMANDS_DB) as Partial<Record<BotCommand, Array<string>>>;

  if (assignedCommands[command] && assignedCommands[command]?.includes(userID)) {
    return true;
  }

  return false;
}

async function assignSubCommands(userID: string, subCommands: Array<string>): Promise<void> {
  const assignedSubCommands = await require(ASSIGNED_SUB_COMMANDS_DB) as Record<string, Array<string> | undefined>;

  subCommands.forEach(subCommand => {
    if (!assignedSubCommands[subCommand]) {
      assignedSubCommands[subCommand] = [];
    }

    if (!assignedSubCommands[subCommand]?.includes(userID)) {
      assignedSubCommands[subCommand]?.push(userID);
    }
  });

  await writeFile(ASSIGNED_SUB_COMMANDS_DB, JSON.stringify(assignedSubCommands, null, 4));
}

async function removeSubCommands(userID: string, subCommands: Array<string>): Promise<void> {
  const assignedSubCommands = await require(ASSIGNED_SUB_COMMANDS_DB) as Record<string, Array<string> | undefined>;

  subCommands.forEach(subCommand => {
    if (!assignedSubCommands[subCommand]) return;
    
    assignedSubCommands[subCommand] = assignedSubCommands[subCommand]?.filter(item => item !== userID);
  });

  await writeFile(ASSIGNED_SUB_COMMANDS_DB, JSON.stringify(assignedSubCommands, null, 4));
}

async function isUserAssignedSubCommand(userID: string, subCommand: string): Promise<boolean> {
  const assignedSubCommands = await require(ASSIGNED_SUB_COMMANDS_DB) as Record<string, Array<string> | undefined>;

  return Boolean(assignedSubCommands[subCommand]?.includes(userID));
}

async function getCampaign(campaignName: string): Promise<ICampaign | void> {
  const campaigns = await require(CAMPAIGNS_DB) as Record<string, ICampaign | undefined>;
  const campaign = campaigns[campaignName];

  return campaign;
}

async function createCampaign(campaign: ICampaign): Promise<void> {
  const campaigns = await require(CAMPAIGNS_DB) as Record<string, ICampaign | undefined>;
  campaigns[campaign.name] = campaign;

  await writeFile(CAMPAIGNS_DB, JSON.stringify(campaigns, null, 4));
}

// Fake DB Client while we don't have a DB set up yet
export const db = {
  getLOTRQuotes,
  assignCommand,
  removeAssignedCommand,
  isUserAssignedCommand,
  assignSubCommands,
  removeSubCommands,
  isUserAssignedSubCommand,
  getCampaign,
  createCampaign
};
