import { BotCommand } from "../constants/commands";

/**
 * Returns whether a command is a valid command
 * @param command potential value to check if is a valid command
 * @returns whether or not command is valid
 */
export const isValidCommand = (command: string): boolean => {
  return Object.values(BotCommand).includes(command as BotCommand);
};
