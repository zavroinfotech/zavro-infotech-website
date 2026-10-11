/**
 * Portfolio data. Single source of truth for project cards and detail pages.
 * Rules (docs/06-portfolio/project-register.md):
 *  - Only verified facts. Leave a field out rather than guess.
 *  - Status must be accurate: Live, In Progress, Prototype or Concept.
 *  - Internal notes (permission, review date) are never rendered publicly.
 *  - Private engineering notes and rights questions stay OUT of this file.
 */
export type ProjectStatus = "Live" | "In Progress" | "Prototype" | "Concept";

export type FeatureState = "built" | "partial" | "planned" | "unverified";

export type FeatureGroup = {
  title: string;
  items: { name: string; state: FeatureState; note?: string }[];
};

export type Screenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  /** Text shown in the status badge, when it should be more specific than `status`. */
  statusLabel?: string;
  /** Short extra context shown beside the status badge. */
  statusNote?: string;
  category: string;
  summary: string;
  projectType?: string;
  /** Zavro's verified role. Omit until confirmed. */
  role?: string;
  format?: string;
  hosting?: string;
  overview?: string;
  goals?: string[];
  /** What is planned for first launch (planned scope, not current status). */
  launchScope?: string;
  /** Grouped feature status: Built / Partial / Planned / Unverified. */
  featureGroups?: FeatureGroup[];
  /** Technologies actually used (checked against the project's package files). */
  techStack?: string[];
  /** Approved screenshots only, with alt text and a caption. */
  images?: Screenshot[];
  /** Slides for the homepage phone preview (first = default). Falls back to `images`. */
  previewImages?: Screenshot[];
  testing?: string;
  next?: string[];
  /** Public demo link, only if approved and safe to share. */
  externalUrl?: string;
  /** Internal only: not shown on the site. */
  internal: { permission: string; lastReviewedAt: string };
};

export const featureStateLabel: Record<FeatureState, string> = {
  built: "Built",
  partial: "Partial",
  planned: "Planned",
  unverified: "Unverified",
};

export const featureStateHelp: Record<FeatureState, string> = {
  built: "Exists in the current build. Not a statement that it is fully tested.",
  partial: "Exists but is incomplete or prototype-level.",
  planned: "In the launch scope; not built yet.",
  unverified: "Cannot be confirmed yet.",
};

export function countFeatureStates(project: Project) {
  const counts: Record<FeatureState, number> = { built: 0, partial: 0, planned: 0, unverified: 0 };
  for (const group of project.featureGroups ?? []) {
    for (const item of group.items) counts[item.state] += 1;
  }
  return counts;
}

export const projects: Project[] = [
  {
    // Neutral slug and title until the client's brand-name and credit clearance is confirmed.
    slug: "mobile-clothing-ecommerce",
    title: "Mobile-First Clothing E-commerce Platform",
    status: "In Progress",
    statusLabel: "In Development and Testing",
    statusNote: "Not live yet",
    category: "Client project · E-commerce · Mobile-first",
    summary:
      "A mobile-first online store built for a clothing-brand client, developed end to end as a custom web application. Development and testing are under way; it is not live yet.",
    projectType: "Client project",
    role: "End-to-end developer, responsible for the full project",
    format: "Mobile-first web application (not a native mobile app)",
    hosting: "Planned; provider not yet specified",
    overview:
      "A mobile-first online store for a clothing brand serving shoppers in India. It brings three journeys together: buying ready-made designs, requesting custom prints, and placing bulk orders for groups such as college events and clubs.",
    goals: [
      "Make the online store the brand's main sales channel.",
      "Support catalogue sales, custom prints and bulk orders from the start.",
      "Give shoppers a fast, thumb-friendly experience with few steps from browsing to checkout.",
      "Offer a guided custom-design flow and a simple bulk-enquiry flow, each separate from normal checkout.",
    ],
    launchScope:
      "Every feature in the project's requirements document is planned for the first launch. Only part of that scope exists today, and anything not marked Built below is still work to do. No launch date has been set.",
    // Source: finalized case-study draft (PRD + read-only code review, 2026-10-02).
    featureGroups: [
      {
        title: "Browsing",
        items: [
          { name: "Home page with category shortcuts and featured products", state: "built" },
          { name: "Tees and Hoodies category pages", state: "built" },
          { name: "Product pages with size and colour selection", state: "built" },
          { name: "Search page", state: "built" },
          { name: "Search suggestions as you type", state: "unverified" },
          { name: "Size guide", state: "partial" },
          { name: "Filters and sorting", state: "planned" },
          { name: "Related products", state: "planned" },
          { name: "Customer reviews", state: "planned" },
          { name: "Caps, Joggers and Jackets categories", state: "planned" },
        ],
      },
      {
        title: "Cart and checkout",
        items: [
          { name: "Persistent cart", state: "built" },
          { name: "Guest checkout", state: "built" },
          { name: "Order confirmation page", state: "built" },
          { name: "Coupon code", state: "partial", note: "Demo logic only" },
          { name: "Address form", state: "partial", note: "Format checks only" },
          { name: "Automatic multi-buy discount", state: "unverified" },
          { name: "Delivery-area (pincode) check", state: "planned" },
          {
            name: "Online payments with Razorpay",
            state: "planned",
            note: "In progress. Checkout currently supports cash on delivery only.",
          },
          { name: "Order confirmation by email or SMS", state: "planned" },
        ],
      },
      {
        title: "Custom prints",
        items: [
          { name: "Three-step custom print flow with artwork upload", state: "built" },
          { name: "Order status stages (admin side)", state: "partial" },
          { name: "Customer-facing order tracking", state: "unverified" },
          { name: "Price estimate before submitting", state: "planned" },
        ],
      },
      {
        title: "Bulk orders",
        items: [
          { name: "Bulk enquiry form", state: "built" },
          { name: "Routing of enquiries to the team", state: "partial" },
        ],
      },
      {
        title: "Accounts",
        items: [
          { name: "Email sign-up, sign-in and password reset", state: "built" },
          { name: "Order history and lookup", state: "built" },
          { name: "Wishlist", state: "partial", note: "Selections are not saved yet" },
          { name: "Phone or OTP sign-in", state: "planned" },
        ],
      },
      {
        title: "Content and operations",
        items: [
          { name: "Admin dashboard for catalogue, orders, custom and bulk requests", state: "built" },
          { name: "Mobile-first responsive layout", state: "built" },
          { name: "About page", state: "built" },
          { name: "Shipping and returns policy pages", state: "partial", note: "Placeholder text" },
          { name: "FAQ page", state: "planned" },
          { name: "Installable web app and sitemap", state: "planned" },
          { name: "Page-load performance target", state: "unverified", note: "Not yet measured" },
        ],
      },
    ],
    // Versions verified in package.json: Next 14.2.35, React 18.3.1.
    techStack: [
      "Next.js 14 (App Router)",
      "React 18",
      "Tailwind CSS",
      "MongoDB (Mongoose)",
      "Razorpay (planned)",
    ],
    // Only the two screenshots approved as suitable. Product artwork and model photos are
    // NOT used until the client's usage rights are confirmed.
    // NOTE: both images show the client's brand name. Remove this array (the page then shows a
    // neutral placeholder) if the brand name must stay hidden before any public deployment.
    images: [
      {
        src: "/projects/mobile-clothing-ecommerce/custom-print-flow.png",
        alt: "Custom print form on a phone, step 1 of 3: choosing a garment type, base colour and size.",
        width: 725,
        height: 1016,
        caption: "Custom print flow",
      },
      {
        src: "/projects/mobile-clothing-ecommerce/navigation-menu.png",
        alt: "Slide-out navigation menu listing shop categories, printing services and account links.",
        width: 428,
        height: 1015,
        caption: "Navigation menu",
      },
    ],
    // Homepage phone preview: storefront first (the default), then the approved slides above.
    // LOCAL PREVIEW ONLY: these screens show the client's branding and product imagery.
    // Keep them out of any public deployment until the client's written permission and the
    // product-image rights are confirmed.
    previewImages: [
      {
        src: "/projects/mobile-clothing-ecommerce/storefront.png",
        alt: "Heavyweight Hoodies category page on a phone, with category tabs, product cards and the bottom navigation bar.",
        width: 726,
        height: 1016,
        caption: "Storefront",
      },
      {
        src: "/projects/mobile-clothing-ecommerce/custom-print-flow.png",
        alt: "Custom print form on a phone, step 1 of 3: choosing a garment type, base colour and size.",
        width: 725,
        height: 1016,
        caption: "Custom print flow",
      },
      {
        src: "/projects/mobile-clothing-ecommerce/navigation-menu.png",
        alt: "Slide-out navigation menu listing shop categories, printing services and account links.",
        width: 428,
        height: 1015,
        caption: "Navigation menu",
      },
    ],
    testing:
      "In development and testing. A test log (devices, browsers and results) has not been provided yet, so nothing beyond that is claimed.",
    next: [
      "Complete the planned launch scope, including online payments.",
      "Production-ready storage for uploaded designs.",
      "Final client-supplied catalogue, photography and policy content.",
      "Wider device and browser testing, with a recorded test log.",
      "Select a hosting provider, then client sign-off.",
    ],
    internal: {
      permission: "Founder confirmed public showcase permission (2026-10-01). Client's written approval pending.",
      lastReviewedAt: "2026-10-02",
    },
  },
  // The second project is an Initial Idea and is intentionally NOT listed here.
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
