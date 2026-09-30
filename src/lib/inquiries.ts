import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  emailed: boolean;
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "inquiries.json");

async function readAll(): Promise<Inquiry[]> {
  try {
    const raw = await readFile(dataFile, "utf8");
    const parsed = JSON.parse(raw) as Inquiry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function listInquiries(): Promise<Inquiry[]> {
  const items = await readAll();
  return items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function saveInquiry(input: {
  name: string;
  email: string;
  message: string;
  emailed: boolean;
}): Promise<Inquiry> {
  const items = await readAll();
  const inquiry: Inquiry = {
    id: randomUUID(),
    name: input.name,
    email: input.email,
    message: input.message,
    createdAt: new Date().toISOString(),
    emailed: input.emailed,
  };
  items.push(inquiry);
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(items, null, 2), "utf8");
  return inquiry;
}
