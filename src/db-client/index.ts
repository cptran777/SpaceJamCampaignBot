import { BotCommand } from "src/message-commands/constants";
import path = require("path");
import { writeFile } from "./utils";

const lotrQuotes = require("../../db/quotes.json");
const ASSIGNED_COMMANDS_DB = path.join(process.cwd(), "db/tables/assigned-commands.json");

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

// Fake DB Client while we don't have a DB set up yet
export const db = {
  getLOTRQuotes,
  assignCommand,
  removeAssignedCommand,
  isUserAssignedCommand
};
