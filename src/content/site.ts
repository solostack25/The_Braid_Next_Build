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
  status: "Active" | "Coming soon";
  icon: "home" | "link" | "health" | "baby" | "shield";
  tint: "olive" | "gold";
  short: string;
  body: string[];
  services?: string[];
  needs?: string[];
};

export const programs: Program[] = data.programs as unknown as Program[];

export const values = data.values;

export const leadership = data.leadership;

/** Donation designations on the Donate page. */
export const funds = data.funds;
