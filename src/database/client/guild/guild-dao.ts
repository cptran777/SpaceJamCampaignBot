import pg = require("pg");
import { SERVER_MEMBERS_TABLE } from "../constants";

export class GuildDAO {
  private client: pg.Client;

  async getGondorMemberIDs(): Promise<Array<string>> {
    const response = await this.client.query(
      `SELECT * from ${SERVER_MEMBERS_TABLE}`
    );

    const memberIDStrings: string = response.rows[0].member_ids;
    return memberIDStrings.split(",");
  }

  constructor(client: pg.Client) {
    this.client = client;
  }
}
