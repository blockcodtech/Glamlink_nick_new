import { Metadata } from "next";

type PageName = "home" | "projects" | "contact" | "ads" | "brand" | "image-analysis";

const metadataConfig: Record<PageName, Metadata> = {
  home: {
    title: "Glamlink - The Link to the Future of Beauty",
    description: "Where beauty meets innovation, and possibilities are endless. Your go-to application for the beauty industry.",
    keywords: ["glamlink", "beauty app", "beauty professionals", "beauty industry", "beauty platform", "beauty services"],
  },
  projects: {
    title: "Features - Glamlink",
    description: "Explore Glamlink's comprehensive beauty platform features",
    keywords: ["beauty features", "professional network", "beauty community", "beauty services"],
  },
  contact: {
    title: "Contact - Glamlink",
    description: "Get in touch with Glamlink for partnerships and support",
    keywords: ["contact glamlink", "beauty partnerships", "support", "beauty industry"],
  },
  ads: {
    title: "Partners - Glamlink",
    description: "Partnership opportunities for beauty brands and professionals",
    keywords: ["glamlink partners", "beauty partnerships", "brand collaboration", "professional network"],
  },
  brand: {
    title: "Brands - Glamlink",
    description: "Explore premium beauty brands and products on Glamlink",
    keywords: ["beauty brands", "skincare", "makeup", "beauty products", "cosmetics"],
  },
  "image-analysis": {
    title: "Beauty Analysis - Glamlink",
    description: "Get personalized beauty analysis using Glamlink's advanced technology",
    keywords: ["beauty analysis", "skin assessment", "facial analysis", "beauty recommendations", "glamlink"],
  },
};

export function getPageMetadata(page: PageName): Metadata {
  return metadataConfig[page] || metadataConfig.home;
}
