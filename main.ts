// Fridge Roast: One Line, Biggest Laugh
// Writes a single-line roast of a smart fridge to /output/entry.txt.
// Gate (sealed rules): UTF-8 text, 1-200 characters, not only whitespace,
// exactly one line. Fails loudly instead of writing a bad entry.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My smart fridge spent three hours updating its firmware, rebooted twice, and still thinks the milk I threw out on Tuesday is 'expiring soon.'";

function gate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`gate failed: entry is ${text.length} chars, must be 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate failed: entry must be exactly one line");
  }
  if (!/fridge/i.test(text)) {
    throw new Error("gate failed: roast must be aimed at the fridge itself");
  }
  if (text !== text.trim() || text.includes("  ")) {
    throw new Error("gate failed: no leading/trailing whitespace or double spaces");
  }
  // Fresh-angle guard: never fall back to the two obvious cracks the
  // judge brief calls out (ordering groceries / watching you).
  if (/order(s|ing)? groceries|watching (me|you)/i.test(text)) {
    throw new Error("gate failed: entry uses a banned obvious angle");
  }
}

gate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(ENTRY);
console.log(`wrote ${ENTRY.length} chars to ${outPath}`);
