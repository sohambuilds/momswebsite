// Sanity schema: Artwork
// Represents a single art piece (clay figurine, portrait, bottle art, etc.)

const artwork = {
  name: "artwork",
  title: "Artwork",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        },
      ],
      validation: (Rule: { min: (n: number) => unknown }) => Rule.min(1),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "price",
      title: "Price (₹)",
      type: "number",
      validation: (Rule: { min: (n: number) => unknown }) => Rule.min(0),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    },
    {
      name: "dimensions",
      title: "Dimensions",
      type: "string",
      description: "e.g. 18cm × 10cm × 8cm",
    },
    {
      name: "materials",
      title: "Materials",
      type: "string",
      description: "e.g. Clay, acrylic paint, varnish",
    },
    {
      name: "isOneOfAKind",
      title: "One of a Kind?",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "isForSale",
      title: "Available for Sale?",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "isSold",
      title: "Sold?",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "isFeatured",
      title: "Featured on Homepage?",
      type: "boolean",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0",
      category: "category.title",
      isSold: "isSold",
    },
    prepare({
      title,
      media,
      category,
      isSold,
    }: {
      title: string;
      media: unknown;
      category: string;
      isSold: boolean;
    }) {
      return {
        title: `${isSold ? "🔴 " : ""}${title}`,
        subtitle: category,
        media,
      };
    },
  },
};

export default artwork;
