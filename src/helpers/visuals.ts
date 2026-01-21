import crypto from "node:crypto";

export const generateHash = (value: string) => {
  return crypto.createHash("sha256").update(value).digest("hex");
};
