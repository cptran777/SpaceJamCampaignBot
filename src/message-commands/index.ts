import { Message } from "discord.js";
import { COMMAND_PREFIX } from "./constants";
import { getRandomLOTRQuote, lightTheFiresOfGonder } from "./sam";
import yargs = require("yargs-parser");
import { BotCommand } from "src/constants/commands";
import { mentionUser } from "./utils/user";

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

    const command = args._[0].toLowerCase();

    switch (command) {
      case BotCommand.Sam:
        getRandomLOTRQuote(message);
        break;
      default:
        message.reply(
          `Sorry, ${mentionUser(
            message.author.id
          )}, I don't recognize that command.`
        );
    }

    return;
  } catch (error) {
    console.log(error);
    message.reply("I just want to make everyone happy with my singing...");
    return;
  }

  message.reply("I just want to make everyone happy with my singing.");
}
