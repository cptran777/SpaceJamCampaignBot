import { SERVER_MEMBERS_DB } from "../constants";

export async function getAllServerMembers(): Promise<Array<string>> {
  const members = (await require(SERVER_MEMBERS_DB)).members as Array<string>;
  return members;
}
