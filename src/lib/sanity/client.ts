import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2026-03-01";

// `createClient` throws synchronously if `projectId` is undefined, which would
// crash the build even on routes that never actually hit Sanity. We pass a
// harmless placeholder so the import succeeds; every real fetch is gated by
// `isSanityConfigured()` below, so the placeholder is never queried.
const safeProjectId = projectId || "placeholder";

// Public client — used for reads (no token needed)
export const client = createClient({
  projectId: safeProjectId,
  dataset,
  apiVersion,
  useCdn: true, // fast edge cache for reads
});

// Authenticated client — used for writes (custom orders, feedback)
export const writeClient = createClient({
  projectId: safeProjectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

/**
 * Returns true when Sanity env vars are configured.
 * Pages use this to decide whether to fetch from Sanity or show fallback data.
 */
export function isSanityConfigured(): boolean {
  return Boolean(projectId && projectId !== "your_project_id");
}
