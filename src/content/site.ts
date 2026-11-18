/**
 * Everything likely to change lives here, not in the page files.
 * Values in [BRACKETS] are placeholders The Braid still needs to supply.
 */

// Editable in the SoloStack Command Center: the values below live in
// src/content/data/site.json. Keep types and helpers here.
import data from "./data/site.json";

export const site = data.site;

/** Homepage photo beside "One strand frays". Empty src shows a placeholder. */
export const homePhoto = data.homePhoto;

export const nav = data.nav;

export const stats = data.stats;

export const strands = data.strands;

export const partners = data.partners;

export type Program = {
  slug: string;
  name: string;
  status: "Active" | "Coming soon" | "Raising funds";
  icon: "home" | "link" | "health" | "baby" | "shield";
  tint: "olive" | "gold";
  short: string;
  body: string[];
  services?: string[];
  needs?: string[];
  /** Optional dedicated page for this program. */
  page?: string;
  /** Donation fund id (see `funds`) this program's appeal gives to. */
  fund?: string;
  /** Donation appeal shown on the program's page. */
  appeal?: { headline: string; text: string };
};

export const programs: Program[] = data.programs as unknown as Program[];

export function programBySlug(slug: string): Program {
  const p = programs.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown program: ${slug}`);
  return p;
}

export function pillClass(status: Program["status"]): string {
  if (status === "Active") return "pill pill-active";
  if (status === "Raising funds") return "pill pill-fund";
  return "pill pill-soon";
}

export type HouseFundUse = { name: string; text: string; amount: number | null };
export type HouseFund = {
  goal: number | null;
  raised: number | null;
  donors: number | null;
  uses: HouseFundUse[];
};

/** The House Fund campaign. Leave goal/raised empty until The Braid confirms them. */
export const houseFund = data.houseFund as unknown as HouseFund;

export const values = data.values;

export const leadership = data.leadership;

/** Donation designations on the Donate page. */
export const funds = data.funds;
