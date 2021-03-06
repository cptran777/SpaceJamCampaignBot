import Discord from "discord.js";
import { mentionUser } from "../utils/user";
import { dbClient } from "../../../database/client";
import { BotCommand } from "../../constants/commands";

/**
 * Will light the fires of gondor and call out to specific users for our personal server
 * List of users is actually pretty arbitrary, but this could eventually be expanded to be generic
 * @param message - message that triggered this command
 */
export async function lightTheFiresOfGonder(
  message: Discord.Message
): Promise<void> {
  const requesterID = message.author.id;

  const serverMemberIDs = await dbClient.guild.getGondorMemberIDs();
  const serverMentions = serverMemberIDs.map((memberID) =>
    mentionUser(memberID)
  );
  message.reply(
    `LIGHT THE FIRES OF GONDOR! ${serverMentions.join(
      " , "
    )}, ${"\n\n"} ${mentionUser(requesterID)} calls for aid!`
  );
}

/**
 * Response to the user with a random LOTR quote, our first test command
 * @param message - message that triggered the command
 */
export async function getRandomLOTRQuote(
  message: Discord.Message
): Promise<void> {
  const requesterID = message.author.id;

  const isRequesterAllowedCommand = await dbClient.assign.isUserAssignedCommand(
    requesterID,
    BotCommand.Sam
  );

  if (!isRequesterAllowedCommand) {
    message.reply(
      `Sorry, ${message.author.username}, you can't use the ${BotCommand.Sam} command.`
    );
    return;
  }

  const possibleQuotes = await dbClient.getLOTRQuotes();
  message.reply(
    possibleQuotes[Math.floor(Math.random() * possibleQuotes.length)]
  );
}
