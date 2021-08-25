import { CAMPAIGNS_DB } from "../constants";
import { writeFile } from "../utils";

export async function addCampaignMember(
  campaignName: string,
  userID: string
): Promise<void> {
  const campaigns = (await require(CAMPAIGNS_DB)) as Record<
    string,
    ICampaign | undefined
  >;
  const campaign = campaigns[campaignName];

  if (!campaign?.memberIDs.includes(userID)) {
    campaign?.memberIDs.push(userID);
  }

  await writeFile(CAMPAIGNS_DB, JSON.stringify(campaigns, null, 4));
}

export async function addCampaignCharacter(
  campaignName: string,
  character: ICampaignCharacter
): Promise<void> {
  const campaigns = (await require(CAMPAIGNS_DB)) as Record<
    string,
    ICampaign | undefined
  >;
  const campaign = campaigns[campaignName];

  if (!campaign?.characters.find((item) => item.name === character.name)) {
    campaign?.characters.push(character);
  }

  await writeFile(CAMPAIGNS_DB, JSON.stringify(campaigns, null, 4));
}

export async function addCampaignCharacterOwnership(
  campaignName: string,
  characterName: string,
  userID: string
): Promise<void> {
  const campaigns = (await require(CAMPAIGNS_DB)) as Record<
    string,
    ICampaign | undefined
  >;
  const campaign = campaigns[campaignName];

  if (campaign) {
    campaign.characterOwnership[userID] = characterName;
  }

  await writeFile(CAMPAIGNS_DB, JSON.stringify(campaigns, null, 4));
}
