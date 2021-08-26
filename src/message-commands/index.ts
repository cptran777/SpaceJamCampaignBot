import { Message } from "discord.js";
import { COMMAND_PREFIX } from "./constants";
import { lightTheFiresOfGonder } from "./sam";
import yargs = require("yargs-parser");

export function messageCommandHandler(message: Message): void {
  if (message.author.bot) return;
  if (!message.content.startsWith(COMMAND_PREFIX)) return;

  const commandBody = message.content.slice(COMMAND_PREFIX.length);

  try {
    const args = yargs(commandBody);

    console.log("[ARGS]");
    console.log(args);

    const invocation = args._.shift()?.toLowerCase();

    if (invocation !== "vivy") return;

    if (args._.includes(`"light the fires of gondor"`)) {
      lightTheFiresOfGonder(message);
      return;
    }
  } catch (error) {
    console.log(error);
    return;
  }

  message.reply("I just want to make everyone happy with my singing.");
}
