// judge-smile — entry for make.fun's "Make the Judge Smile" bounty.
// The program writes exactly one line (at most 200 characters) about a
// small good thing that happened today to /output/entry.txt.
// No network, no input files, no randomness: the same line every run.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "This morning the power went out, so my neighbour knocked with two cups of coffee, and we drank them on the stairs while our dark street slowly woke up \u2014 nobody checked a phone once.";

function main(): void {
  const line = LINE.replace(/\s+/g, " ").trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry line must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line + "\n", "utf8");
}

main();
