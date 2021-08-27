import pg = require("pg");
import { BotCommand } from "../../../constants/commands";
import { isValidCommand, isValidSubCommand } from "../../../utils/commands";
import { COMMAND_ASSIGNMENTS_TABLE, SUB_COMMAND_ASSIGNMENTS_TABLE } from "../constants";

export class AssignDAO {
  private client: pg.Client;

  /**
   * Creates an entry in the database that assigns a command to a specific user
   * @param userID ID of the user to assign a command
   * @param command command to be assigned to a user
   */
  async assignCommand(userID: string, command: BotCommand): Promise<void> {
    const isAssignedAlready = await this.isUserAssignedCommand(userID, command);

    if (isAssignedAlready) return;

    await this.client.query(
      `INSERT INTO ${COMMAND_ASSIGNMENTS_TABLE} (command_name, user_id) VALUES ($1, $2)`,
      [command, userID]
    );
  }

  /**
   * Removes an assigned top level command from a user by deleting the db entry
   * @param userID user by ID to remove the command assignment
   * @param command command to be removed from the user
   */
  async removeAssignedCommand(
    userID: string,
    command: BotCommand
  ): Promise<void> {
    if (!isValidCommand(command)) return;

    await this.client.query(
      `DELETE FROM ${COMMAND_ASSIGNMENTS_TABLE} where command_name = $1 and user_id = $2`,
      [command, userID]
    );
  }

  /**
   * Determines whether a user by ID is assigned a particular top level command or not
   * @param userID ID of the user to check for command assignment
   * @param command command to check against
   * @returns whether the user is assigned a command
   */
  async isUserAssignedCommand(
    userID: string,
    command: BotCommand
  ): Promise<boolean> {
    if (!isValidCommand(command)) return false;

    const checkExistingEntryResponse = await this.client.query(
      `SELECT * from ${COMMAND_ASSIGNMENTS_TABLE} where user_id = $1 and command_name = $2`,
      [userID, command]
    );

    const isAssignedAlready = checkExistingEntryResponse.rows.length !== 0;
    return isAssignedAlready;
  }

  async assignSubCommand(userID: string, command: string): Promise<void> {
    const isAssignedAlready = await this.isUserAssignedSubCommand(userID, command);

    if (isAssignedAlready) return;

    await this.client.query(
      `INSERT INTO ${SUB_COMMAND_ASSIGNMENTS_TABLE} (sub_command_name, user_id) VALUES ($1, $2)`,
      [command, userID]
    );
  }

  async removeAssignedSubCommand(
    userID: string,
    command: string
  ): Promise<void> {
    if (!isValidSubCommand(command)) return;

    await this.client.query(
      `DELETE FROM ${SUB_COMMAND_ASSIGNMENTS_TABLE} where sub_command_name = $1 and user_id = $2`,
      [command, userID]
    );
  }

  async isUserAssignedSubCommand(
    userID: string,
    command: string
  ): Promise<boolean> {
    if (!isValidSubCommand(command)) return false;

    const checkExistingEntryResponse = await this.client.query(
      `SELECT * from ${SUB_COMMAND_ASSIGNMENTS_TABLE} where user_id = $1 and sub_command_name = $2`,
      [userID, command]
    );

    const isAssignedAlready = checkExistingEntryResponse.rows.length !== 0;
    return isAssignedAlready;
  }

  constructor(client: pg.Client) {
    this.client = client;
  }
}
