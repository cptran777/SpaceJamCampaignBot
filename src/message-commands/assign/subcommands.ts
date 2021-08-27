export async function handleSubCommandAssignment(
  userID: string,
  subCommands: Array<string>
): Promise<void> {
  if (subCommands.length === 0) return;

  console.log(userID);
}

export async function handleSubCommandRemoval(
  userID: string,
  subCommands: Array<string>
): Promise<void> {
  if (subCommands.length === 0) return;

  console.log(userID);
}
