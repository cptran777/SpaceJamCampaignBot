const lotrQuotes = require("../../db/quotes.json");

export async function getLOTRQuotes(): Promise<Array<string>> {
  // Faking async-ness
  const quotes = await lotrQuotes.quotes;
  return quotes;
}