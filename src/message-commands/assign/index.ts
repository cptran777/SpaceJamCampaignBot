import { BotCommand } from "../constants";
import Discord from "discord.js";
import { db } from "../../db-client";

// To ensure that we do not mistype process.env variables, which are essentially "any" keys
const PROCESS_ENV = process.env as NodeJS.ProcessEnv & IEnvironmentVariables;

/**
 * Handles commands in the format !vivy assign @User commandName
 * @param args - [<mentioned user>, assignedCommand]
 * @param message - message object from Discord
 *  https://discord.js.org/#/docs/main/stable/class/Message
 */
export async function handleAssignCommand(args: Array<string>, message: Discord.Message): Promise<void> {
  if (message.author.id !== PROCESS_ENV.ADMIN_ID) {
    message.reply("Only my admin can assign commands"); 
    return;
  }

  const assignTarget = message.mentions.users.first();

  if (!assignTarget) {
    message.reply("I didn't recognize who you wanted to assign");
    return;
  }

  const assignedCommand = args[1] as BotCommand;
  const assignableCommands = Object.values(BotCommand).filter(item => item !== BotCommand.Assign);

  if (!assignableCommands.includes(assignedCommand)) {
    message.reply(`I don't recognize the command you want to assign to ${assignTarget.username}`);
    return
  }

  console.log(message.mentions.users.first());
  console.log(message.mentions.users.first()?.id);
  console.log(args);

  const flags = args.filter(item => item.includes("--")).map(item => item.toLowerCase().replace("--", ""));

  try {
    if (flags.includes("remove")) {
      await db.removeAssignedCommand(assignTarget.id, assignedCommand);
      message.reply(`${assignTarget.username} can no longer user the command !${assignedCommand}`);
    } else {
      await db.assignCommand(assignTarget.id, assignedCommand);
      message.reply(`${assignTarget.username} can now use the command !${assignedCommand}`);
    }
  } catch (error) {
    console.log(error);
    message.reply("I just wanted to make everyone happy with my singing...");
  }
}
