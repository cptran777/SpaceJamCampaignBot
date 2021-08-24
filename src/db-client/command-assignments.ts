import { BotCommand } from "../message-commands/constants";
import { ASSIGNED_COMMANDS_DB, ASSIGNED_SUB_COMMANDS_DB } from "./constants";
import { writeFile } from "./utils";

/**
 * Assigns a high level command to the user
 * @param userID - user to assigned command
 * @param command - command to be assigned to the user
 */
export async function assignCommand(userID: string, command: BotCommand): Promise<void> {
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

/**
 * Removes a high level command from a user
 * @param userID - user to remove command
 * @param command - command to be removed
 */
export async function removeAssignedCommand(userID: string, command: BotCommand): Promise<void> {
  const assignedCommands = require(ASSIGNED_COMMANDS_DB) as Partial<Record<BotCommand, Array<string>>>;

  if (!assignedCommands[command]) return;

  assignedCommands[command] = assignedCommands[command]?.filter(item => item !== userID);
  await writeFile(ASSIGNED_COMMANDS_DB, JSON.stringify(assignedCommands, null, 4));
}

/**
 * Checks whether the user has been assigned a command
 * @param userID - user to check for command permission
 * @param command - command that should be assigned
 * @returns whether or not a user has been assigned a particular command
 */
export async function isUserAssignedCommand(userID: string, command: BotCommand): Promise<boolean> {
  // Faking the fetch part from the DB
  const assignedCommands = await require(ASSIGNED_COMMANDS_DB) as Partial<Record<BotCommand, Array<string>>>;

  if (assignedCommands[command] && assignedCommands[command]?.includes(userID)) {
    return true;
  }

  return false;
}

export async function assignSubCommands(userID: string, subCommands: Array<string>): Promise<void> {
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

export async function removeSubCommands(userID: string, subCommands: Array<string>): Promise<void> {
  const assignedSubCommands = await require(ASSIGNED_SUB_COMMANDS_DB) as Record<string, Array<string> | undefined>;

  subCommands.forEach(subCommand => {
    if (!assignedSubCommands[subCommand]) return;
    
    assignedSubCommands[subCommand] = assignedSubCommands[subCommand]?.filter(item => item !== userID);
  });

  await writeFile(ASSIGNED_SUB_COMMANDS_DB, JSON.stringify(assignedSubCommands, null, 4));
}

export async function isUserAssignedSubCommand(userID: string, subCommand: string): Promise<boolean> {
  const assignedSubCommands = await require(ASSIGNED_SUB_COMMANDS_DB) as Record<string, Array<string> | undefined>;

  return Boolean(assignedSubCommands[subCommand]?.includes(userID));
}
