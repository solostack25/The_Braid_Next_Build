/** Mirrors thebraidinc.org/resources (October 2026). Check numbers yearly. */

// Editable in the SoloStack Command Center: the values below live in
// src/content/data/resources.json. Keep types and helpers here.
import data from "./data/resources.json";

export type Resource = { name: string; phone?: string; tel?: string; url?: string; text: string };

export const resourceGroups: { title: string; items: Resource[] }[] = data.resourceGroups as unknown as { title: string; items: Resource[] }[];
