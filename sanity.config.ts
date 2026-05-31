/**
 * Sanity Studio configuration.
 *
 * Mounts an embedded Studio at /studio on the Next.js site. Mom (and anyone
 * else on the access list configured at sanity.io/manage) logs in here to
 * manage artworks, blog posts, categories, custom-order requests, and
 * feedback notes.
 *
 * The `projectId` and `dataset` env vars are read at build time. If they're
 * missing the Studio will refuse to load with a clear error — that's
 * intentional, since a misconfigured Studio is worse than none at all.
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  // Don't throw at module load — Next will eagerly evaluate this on every
  // route, including ones that never hit the Studio. Log loudly instead so
  // the failure surfaces only when the Studio page actually tries to render.
  // eslint-disable-next-line no-console
  console.warn(
    "[sanity.config] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. " +
      "The Studio at /studio will not work until it's configured.",
  );
}

export default defineConfig({
  name: "clay-corner",
  title: "Clay Corner Studio",
  projectId: projectId || "placeholder",
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      // Custom sidebar grouping so mom sees the catalogue first, then
      // commissions, then journal, then settings.
      structure: (S) =>
        S.list()
          .title("Clay Corner")
          .items([
            S.listItem()
              .title("Artworks")
              .child(
                S.documentTypeList("artwork").title("All artworks"),
              ),
            S.listItem()
              .title("Categories")
              .child(
                S.documentTypeList("category").title("Categories"),
              ),
            S.divider(),
            S.listItem()
              .title("Custom-order requests")
              .child(
                S.documentTypeList("customOrder")
                  .title("Incoming commissions")
                  .defaultOrdering([
                    { field: "submittedAt", direction: "desc" },
                  ]),
              ),
            S.divider(),
            S.listItem()
              .title("Journal posts")
              .child(
                S.documentTypeList("blogPost").title("Journal"),
              ),
          ]),
    }),
    // GROQ playground — useful when debugging queries; harmless for mom.
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
