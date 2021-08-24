import fs = require("fs");

export function writeFile(path: string, content: string): void {
  fs.writeFileSync(path, content, { encoding: "utf8" });
}