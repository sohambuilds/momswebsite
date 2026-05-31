import type { SchemaTypeDefinition } from "sanity";
import artwork from "./artwork";
import blogPost from "./blogPost";
import category from "./category";
import customOrder from "./customOrder";

// The individual schema files were authored with hand-rolled field types
// rather than Sanity's `defineType` helper. The shapes are correct at
// runtime but TypeScript can't prove that, so we cast at the boundary.
// PR 2 will rewrite these with `defineType` for full type safety.
export const schemaTypes: SchemaTypeDefinition[] = [
  artwork,
  blogPost,
  category,
  customOrder,
] as unknown as SchemaTypeDefinition[];
