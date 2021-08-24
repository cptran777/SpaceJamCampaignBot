/**
 * @param value - value to test against
 * @returns whether the argument value is a user mention based on the string format
 */
export function isUserMention(value: string): boolean {
  return /<@.+>/.test(value);
}