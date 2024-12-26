// src/sanity.js
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Initialize the Sanity client
const client = sanityClient({
  projectId: 'dx044ec8', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your Sanity dataset (usually 'production')
  useCdn: true, // `false` if you want to ensure fresh data
});

// Set up the image URL builder
const builder = imageUrlBuilder(client);

// Function to generate image URLs
export const urlFor = (source) => builder.image(source);

// Export the Sanity client
export default client;
