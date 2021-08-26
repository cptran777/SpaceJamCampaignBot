import { db } from "../../db-client";
import Discord from "discord.js";
import { BotCommand } from "../constants";
import { mentionUser } from "../utils";
import { dbClient } from "src/real-db-client";

export async function getRandomLOTRQuote(
  message: Discord.Message
): Promise<void> {
  const requesterID = message.author.id;
  const isRequesterAllowedCommand = await db.isUserAssignedCommand(
    requesterID,
    BotCommand.Sam
  );

  if (!isRequesterAllowedCommand) {
    message.reply(
      `Sorry, ${message.author.username}, you can't use the ${BotCommand.Sam} command.`
    );
    return;
  }

  const possibleQuotes = await db.getLOTRQuotes();
  message.reply(
    possibleQuotes[Math.floor(Math.random() * possibleQuotes.length)]
  );
}

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
