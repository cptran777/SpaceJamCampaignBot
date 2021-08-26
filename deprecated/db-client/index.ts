import { getLOTRQuotes } from "./lotr-quotes";
import {
  assignCommand,
  assignSubCommands,
  isUserAssignedCommand,
  isUserAssignedSubCommand,
  removeAssignedCommand,
  removeSubCommands,
} from "./command-assignments";
import { createCampaign, getCampaign } from "./campaigns/campaign";
import { getAllServerMembers } from "./members";

// Fake DB Client while we don't have a DB set up yet
export const db = {
  getAllServerMembers,
  getLOTRQuotes,
  assignCommand,
  removeAssignedCommand,
  isUserAssignedCommand,
  assignSubCommands,
  removeSubCommands,
  isUserAssignedSubCommand,
  getCampaign,
  createCampaign,
};
