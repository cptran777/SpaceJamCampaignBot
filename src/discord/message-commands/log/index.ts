import { Message } from "discord.js";
import { Arguments } from "yargs";

/**
 * Logs a specific message property from the server by command, useful for debugging purposes
 * @param args - arguments that were parsed
 * @param message - message that triggered the log
 */
export async function logMessage(
  args: Arguments,
  message: Message
): Promise<void> {
  console.log("Logging message");
  console.log(message.guild);
  console.log(args);
  message.reply("Logged");
}
