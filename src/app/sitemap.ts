import type { MetadataRoute } from "next";

const siteUrl = "https://shoplunevia.vercel.app";

const launchProductIds = [
  "6ac27ab0d796ffb48e0f2ad3",
  "6ac25346d01a18442904d9dd",
  "6ac0b394d8f8171df3095d77",
  "6ac0b132705d92cac403452a",
  "6abf1a69add24cb68103efd0",
  "6abe1f77ab5f91622f04ee9a",
  "6abe1a041407957666064208",
  "6abe08ed139455c65504a655",
  "6abe058e4da6532539083189",
  "6abdd441f79d4fc7940f66d1",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const informationPages = [
    "/contact",
    "/shipping-returns",
    "/privacy-policy",
    "/terms",
  ];

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/shop`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...informationPages.map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    ...launchProductIds.map((id) => ({
      url: `${siteUrl}/shop/${id}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
