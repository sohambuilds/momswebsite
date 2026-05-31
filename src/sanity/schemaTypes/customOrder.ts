// Sanity schema: Custom Order
// Stores custom order requests submitted via the website form

const customOrder = {
  name: "customOrder",
  title: "Custom Order",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Customer Name",
      type: "string",
      readOnly: true,
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    },
    {
      name: "description",
      title: "Piece Description",
      type: "text",
      rows: 5,
      readOnly: true,
    },
    {
      name: "sizePreference",
      title: "Size Preference",
      type: "string",
      readOnly: true,
    },
    {
      name: "budgetRange",
      title: "Budget Range",
      type: "string",
      readOnly: true,
    },
    {
      name: "referenceInfo",
      title: "Reference Link / Info",
      type: "string",
      readOnly: true,
    },
    {
      name: "howDidYouHear",
      title: "How Did They Hear",
      type: "string",
      readOnly: true,
    },
    {
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Reviewed", value: "reviewed" },
          { title: "Accepted", value: "accepted" },
          { title: "Completed", value: "completed" },
          { title: "Declined", value: "declined" },
        ],
      },
      initialValue: "new",
    },
    {
      name: "notes",
      title: "Internal Notes",
      type: "text",
      rows: 3,
      description: "Private notes — not visible to the customer.",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      status: "status",
    },
    prepare({
      title,
      subtitle,
      status,
    }: {
      title: string;
      subtitle: string;
      status: string;
    }) {
      const emoji: Record<string, string> = {
        new: "🟡",
        reviewed: "🔵",
        accepted: "🟢",
        completed: "✅",
        declined: "🔴",
      };
      return {
        title: `${emoji[status] || "⚪"} ${title}`,
        subtitle: subtitle?.slice(0, 80),
      };
    },
  },
};

export default customOrder;
