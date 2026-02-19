import bcrypt from "bcrypt";

// Might turn to env var!
const DEFAULT_COST = 12;

function getCost(): number {
  const raw = process.env.PASSWORD_COST;
  if (!raw) return DEFAULT_COST;

  const n = Number(raw);

  if (!Number.isInteger(n) || n < 10 || n > 15) {
    return DEFAULT_COST;
  }

  return n;
}

export async function hasPassword(password: string): Promise<string> {
  const cost = getCost();
  return bcrypt.hash(password, cost);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
