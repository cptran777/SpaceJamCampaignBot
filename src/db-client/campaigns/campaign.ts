import { CAMPAIGNS_DB } from "../constants";
import { writeFile } from "../utils";

export async function getCampaign(campaignName: string): Promise<ICampaign | void> {
  const campaigns = await require(CAMPAIGNS_DB) as Record<string, ICampaign | undefined>;
  const campaign = campaigns[campaignName];

  return campaign;
}

export async function createCampaign(campaign: ICampaign): Promise<void> {
  const campaigns = await require(CAMPAIGNS_DB) as Record<string, ICampaign | undefined>;
  campaigns[campaign.name] = campaign;

  await writeFile(CAMPAIGNS_DB, JSON.stringify(campaigns, null, 4));
}
