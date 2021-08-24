import { handleAssignCommand } from "./assign";
import { BotCommand, COMMAND_PREFIX } from "./constants";

export function messageCommandHandler(message: any): void {
  if (message.author.bot) return;
  if (!message.content.startsWith(COMMAND_PREFIX)) return;

  const commandBody = message.content.slice(COMMAND_PREFIX.length);
  const args = commandBody.split(' ');
  const invocation = args.shift().toLowerCase();

  if (invocation !== "vivy") return;

  const command = args.shift().toLowerCase();

  if (command === BotCommand.Assign) {
    handleAssignCommand(args, message);
  }
}
