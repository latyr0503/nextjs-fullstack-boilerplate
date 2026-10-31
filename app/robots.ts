import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/data";

const BASE_URL = siteConfig.url;
const PRIVATE_PATHS = ["/api/", "/dashboard/", "/_next/"];

// AI search agents
const AI_SEARCH_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "DuckAssistBot",
  "Amazonbot",
  "Applebot",
  "YouBot",
];

// AI training crawlers
const AI_TRAINING_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  const isProd =
    process.env.NODE_ENV === "production" &&
    !BASE_URL.includes("preview") &&
    !BASE_URL.includes("staging") &&
    !BASE_URL.includes("localhost");

  if (isProd) {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: PRIVATE_PATHS,
        },
        {
          userAgent: AI_SEARCH_BOTS,
          allow: "/",
          disallow: PRIVATE_PATHS,
        },
        {
          userAgent: AI_TRAINING_BOTS,
          allow: "/",
          disallow: PRIVATE_PATHS,
        },
      ],
      sitemap: `${BASE_URL}/sitemap.xml`,
      host: BASE_URL,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    host: BASE_URL,
  };
}
