"use client";

/**
 * Sanity Studio mount-point. Renders the admin dashboard at /studio
 * (and every sub-route via the [[...tool]] catch-all).
 *
 * The Studio is a single-page app that takes over the full viewport.
 * Authentication is handled by Sanity itself — anyone on the project's
 * access list at sanity.io/manage can log in here with a magic link.
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
