import { COMMAND_PREFIX } from "./constants";

export function messageCommandHandler(message: any): void {
  if (message.author.bot) return;
  if (!message.content.startsWith(COMMAND_PREFIX)) return;

  console.log(message);
}
