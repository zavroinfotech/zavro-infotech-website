/**
 * Site-wide content. Only facts confirmed by the founder belong here.
 * Anything marked DRAFT must be approved before launch.
 */
export const site = {
  name: "Zavro Infotech",
  // Approved public contact. Email only; never add a phone number.
  email: "sales@zavroinfotech.in",
  // DRAFT copy from the PRD (section 5); final tagline not yet confirmed.
  headline: "Thoughtfully designed. Purposefully built.",
  subheadline:
    "Websites and mobile applications for startups and growing businesses.",
  description:
    "Zavro Infotech designs and develops websites and mobile applications for startups and small businesses in India and internationally.",
} as const;

export const mailto = `mailto:${site.email}`;

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

// Only the two confirmed services. Descriptions and "includes" lists are DRAFT wording
// and need the founder's approval before launch.
export const services = [
  {
    title: "Website development",
    icon: "web",
    description:
      "Responsive, accessible websites for startups and small businesses, built to be fast and easy to maintain.",
    includes: [
      "Mobile-first, responsive layouts",
      "Accessible, semantic structure",
      "Search-friendly foundations",
      "Performance-minded builds",
      "Launch support",
    ],
  },
  {
    title: "Mobile app development",
    icon: "mobile",
    description:
      "Mobile applications planned and built around what your users and your business actually need.",
    includes: [
      "Planning around key user journeys",
      "Interface design for phones",
      "Development and testing",
      "Launch guidance",
    ],
  },
] as const;

// Steps listed in the UI/UX specification (section 6). DRAFT wording.
export const processSteps = [
  { title: "Discovery", text: "We learn about your business, audience and goals." },
  { title: "Planning", text: "We agree scope, structure and priorities." },
  { title: "Design", text: "We shape the look, layout and experience." },
  { title: "Development", text: "We build it, reviewing progress with you." },
  { title: "Testing", text: "We check devices, accessibility and performance." },
  { title: "Launch", text: "We release it and hand over what you need." },
] as const;

// Facts confirmed in the project decision records.
export const aboutFacts = [
  { label: "Services", value: "Website development, mobile app development" },
  { label: "Who we work with", value: "Startups and small businesses" },
  { label: "Markets", value: "India and international clients" },
] as const;
