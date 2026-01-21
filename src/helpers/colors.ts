import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export async function getDiagonalColors(srcPath: string): Promise<string[]> {
  try {
    const fullPath = path.join(process.cwd(), srcPath);

    await fs.access(fullPath);

    const { data, info } = await sharp(fullPath)
      .resize(5, 5, { fit: "fill" })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const colors: string[] = [];
    const channels = info.channels;

    for (let i = 0; i < 5; i++) {
      const offset = (i * 5 + i) * channels;
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      const hex = `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
      colors.push(hex);
    }

    return colors;
  } catch (_) {
    return [];
  }
}
