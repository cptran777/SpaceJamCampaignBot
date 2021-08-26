import pg = require("pg");
import { IEnvironmentVariables } from "../../types/environment";
import { AssignDAO } from "./assign/assign-dao";
import { GuildDAO } from "./guild/guild-dao";
import { getLOTRQuotes } from "./lotr-quotes";

// To ensure that we do not mistype process.env variables, which are essentially "any" keys
const PROCESS_ENV = process.env as NodeJS.ProcessEnv & IEnvironmentVariables;
const { Client } = pg;

const client = new Client({
  connectionString: PROCESS_ENV.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Activate on deployment
client.connect();

const guildDAO = new GuildDAO(client);
const assignDAO = new AssignDAO(client);

export const dbClient = {
  guild: guildDAO,
  assign: assignDAO,
  getLOTRQuotes,
};
