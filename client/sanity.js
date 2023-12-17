import SanityClient, { createClient } from "@sanity/client";
import imageBuilder from "@sanity/image-url"



const client = createClient({
  projectId: 'y00lbajq',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
})

// Sanity stores images as object so we use this builder so we create url for te images
const builder = imageBuilder(client);


export const urlForImage = src => builder.image(src);
export default client

//npm install -g @sanity/cli
//sanity cors add https://localhost:3000