import { BotCommand } from "src/message-commands/constants";

const lotrQuotes = require("../../db/quotes.json");

async function getLOTRQuotes(): Promise<Array<string>> {
  const quotes = await lotrQuotes.quotes;
  return quotes;
}

async function assignCommand(userID: string, command: BotCommand): Promise<void> {
  
}

// Fake DB Client while we don't have a DB set up yet
export const db = {
  getLOTRQuotes
};
