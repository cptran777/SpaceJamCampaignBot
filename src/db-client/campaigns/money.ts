import { CAMPAIGNS_DB } from "../constants";
import { writeFile } from "../utils";

export async function setCampaignCurrency(
  campaignName: string,
  currencyName: string
): Promise<void> {
  const campaigns = (await require(CAMPAIGNS_DB)) as Record<
    string,
    ICampaign | undefined
  >;
  const campaign = campaigns[campaignName];

  if (campaign) {
    campaign.currency = currencyName;
  }

  await writeFile(CAMPAIGNS_DB, JSON.stringify(campaigns, null, 4));
}

export async function getCampaignCurrency(
  campaignName: string
): Promise<string | undefined> {
  const campaigns = (await require(CAMPAIGNS_DB)) as Record<
    string,
    ICampaign | undefined
  >;
  const campaign = campaigns[campaignName];

  return campaign?.currency;
}

export async function getPlayerMoney(
  campaignName: string,
  userID: string
): Promise<number | undefined> {
  const campaigns = (await require(CAMPAIGNS_DB)) as Record<
    string,
    ICampaign | undefined
  >;
  const campaign = campaigns[campaignName];

  if (campaign) {
    const characterName = campaign.characterOwnership[userID];
    return campaign.money[characterName];
  }
}

export async function getCharacterMoney(
  campaignName: string,
  characterName: string
): Promise<number | undefined> {
  const campaigns = (await require(CAMPAIGNS_DB)) as Record<
    string,
    ICampaign | undefined
  >;
  const campaign = campaigns[campaignName];

  if (campaign) {
    return campaign.money[characterName];
  }
}
