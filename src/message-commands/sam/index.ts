import { db } from "../../db-client";

interface Props {
  userID: string;
}

export async function getRandomLOTRQuote(): Promise<string> {
  const possibleQuotes = await db.getLOTRQuotes();
  return possibleQuotes[Math.floor(Math.random() * possibleQuotes.length)];
};
