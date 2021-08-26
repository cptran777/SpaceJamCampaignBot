import pg = require("pg");
import { GuildDAO } from "./guild/get-all";

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

export const dbClient = {
  guild: guildDAO,
};
