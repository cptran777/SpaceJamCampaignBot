const lotrQuotes = require("../../../db/quotes.json");

export function getLOTRQuotes(): Promise<Array<string>> {
  const quotes = lotrQuotes.quotes;
  return quotes;
}
