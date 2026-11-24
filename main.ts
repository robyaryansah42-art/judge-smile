// judge-smile — entry for make.fun's "Make the Judge Smile" bounty.
// The program writes exactly one line (at most 200 characters) about a
// small good thing that happened today to /output/entry.txt.
// No network, no input files, no randomness: the same line every run.
//
// The entry line itself is a fixed constant below. The code around it is
// deliberately structured so the line can be read, validated and written
// in clearly separated steps — but the bytes written to disk never change.

import { mkdirSync, writeFileSync } from "node:fs";

// ---------------------------------------------------------------------------
// The entry line (184 characters, a single line, no trailing spaces).
// This is the judged content: do not change its wording or punctuation.
// ---------------------------------------------------------------------------
const ENTRY_LINE =
  "This morning the power went out, so my neighbour knocked with two cups of coffee, and we drank them on the stairs while our dark street slowly woke up \u2014 nobody checked a phone once.";

// Output contract for the bounty.
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;
const MAX_LINE_LENGTH = 200;

/**
 * Normalise the entry text: collapse any accidental runs of whitespace
 * (there are none today) and trim the ends, so the line is exactly one
 * clean line before it is validated.
 */
function normaliseLine(raw: string): string {
  return raw.replace(/\s+/g, " ").trim();
}

/**
 * Validate the entry against the bounty rules:
 *  - exactly one line (no newline or carriage-return characters)
 *  - between 1 and 200 characters long
 * Throws on the first violated rule, naming the rule and the length.
 */
function validateLine(line: string): void {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.length < 1 || line.length > MAX_LINE_LENGTH) {
    throw new Error(
      `entry line must be 1-${MAX_LINE_LENGTH} characters, got ${line.length}`,
    );
  }
}

/**
 * Write the validated line to the output file, creating the output
 * directory first. A single trailing newline terminates the file.
 */
function writeEntry(line: string): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, line + "\n", "utf8");
}

function main(): void {
  const line = normaliseLine(ENTRY_LINE);
  validateLine(line);
  writeEntry(line);
}

// Run main() and report failures plainly: a validation or write error
// means the entry was not produced, so exit non-zero with the reason
// instead of a bare stack trace.
try {
  main();
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  console.error(`judge-smile: failed to write entry: ${reason}`);
  process.exit(1);
}
