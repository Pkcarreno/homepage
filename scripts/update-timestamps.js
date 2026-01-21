import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import Glob from "fast-glob";

const { globSync } = Glob;

// Paths to check
const TARGETS = ["src/content/**/*.{md,mdx,mdoc}", "src/pages/**/*.{md,mdx}"];

const OUTPUT_FILE = "src/content/timestamps.json";

function getGitDates(filePath) {
  try {
    const created = execSync(
      `git log --diff-filter=A --follow --format=%aI -1 -- "${filePath}"`,
      { encoding: "utf8" }
    ).trim();
    const updated = execSync(`git log -1 --format=%aI -- "${filePath}"`, {
      encoding: "utf8",
    }).trim();

    return { created, updated };
  } catch (_) {
    return { created: null, updated: null };
  }
}

console.log("Updating timestamp cache...");

const cache = fs.existsSync(OUTPUT_FILE)
  ? JSON.parse(fs.readFileSync(OUTPUT_FILE))
  : {};
const files = globSync(TARGETS);
let changes = 0;

const activeKeys = new Set();

for (const file of files) {
  // Normalize path for consistent keys across OS
  const rawPath = path.relative(process.cwd(), file).split(path.sep).join("/");

  const cleanKey = rawPath.replace(/\.[^/.]+$/, "");

  activeKeys.add(cleanKey);

  const gitDates = getGitDates(file);
  const stats = fs.statSync(file);

  const newEntry = {
    // Fallback to fs stats if git data is missing (e.g. new untracked files)
    created:
      gitDates.created ||
      cache[cleanKey]?.created ||
      stats.birthtime.toISOString(),
    updated: gitDates.updated || stats.mtime.toISOString(),
  };

  if (JSON.stringify(cache[cleanKey]) !== JSON.stringify(newEntry)) {
    cache[cleanKey] = newEntry;
    changes++;
  }
}

// remove deleted files
for (const key of Object.keys(cache)) {
  if (!activeKeys.has(key)) {
    delete cache[key];
    changes++;
  }
}

if (changes > 0 || !fs.existsSync(OUTPUT_FILE)) {
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(cache, null, 2));
  console.log(`✅ Updated ${changes} entries in ${OUTPUT_FILE}`);
} else {
  console.log("✅ Cache is up to date.");
}
