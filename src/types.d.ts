interface IEnvironmentVariables {
  BOT_TOKEN: string;
  CLIENT_ID: string;
  SERVER_ID: string;
  ADMIN_ID: string;
}

interface ICampaign {
  /**
   * Stored name identifier for the campaign
   */
  name: string;
  /**
   * Admin priveleges for the campaign. Creator is usually going to be an admin
   */
  adminIDs: Array<string>;
  /**
   * Person who created the campaign
   */
  creatorID: string;
  /**
   * People who are part of the campaign
   */
  memberIDs: Array<string>;
  /**
   * Name of the currency used in the campaign
   */
  currency: string;
  /**
   * Keeps track of the amount of money each member has
   */
  money: Record<string, number>;
}
