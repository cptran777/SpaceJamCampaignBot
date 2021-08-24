export const COMMAND_PREFIX = "!";

export enum BotCommand {
  Assign = "assign",
  Sam = "sam",
  Campaign = "campaign"
}

export enum CampaignSubCommand {
  Create = "create"
}

export const isValidSubCommand = (value: string): boolean => {
  const allSubcommands: Array<string> = [...Object.values(CampaignSubCommand)];
  return allSubcommands.includes(value);
}
