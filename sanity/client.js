import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-08-07",
  useCdn: false, // Set to false to ensure fresh data during build
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
