import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = new SanityClient({
  projectId: "cw9np7e9",
  dataset: "production",
  apiVersion: "2023-07-14",
  useCdn: true,
  token:
    "skWnI1xAsgEakb8fDNvw7bArLm8pqP3RBet4RGSXX6dUDVzVHmed5Bi8ESID6v3FP3iwoWvTRLk4O6c1PVSl0LJkGj0O0TKoMmjth5mq6K8QBr787Eg3ExJAR85UVDAfPMEeI218YrXc4AgIyUOIJsy26U9y0MIkj6OzDC7BVJC2Yl6sqOdf",
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
// export const urlFor = async (source) => {
//   // Introduce a delay of 1 second
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   return builder.image(source);
// };
