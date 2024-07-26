# My Video App

Welcome to the My Video App repository! This project is a Next.js application using TypeScript and Tailwind CSS, along with an Express server to provide additional functionalities like story generation and text-to-audio conversion.

## Features

- **Carousel on Homepage**
- **Movie List**
- **Search Page**
- **Profile Page**
- **Movie Details Page**
- **Story Generator using Google Gemini**
- **Text to Audio Generation using Google Cloud**
- **Responsive Design**
- **Direct Movie Social Media Sharing**
- **And Many More**

The application is deployed on Vercel. You can access it [here](https://assessment-video.vercel.app/).

GitHub Repository: [My Video App](https://github.com/ebenezersakyi/my-video-app.git)

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Approach and Trade-offs](#approach-and-trade-offs)
- [Additional Features](#additional-features)
- [Testing](#testing)
- [Deployment](#deployment)

## Setup Instructions

1. **Clone the repository:**

   ```sh
   git clone https://github.com/ebenezersakyi/my-video-app.git
   cd my-video-app
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the following variables:

   ```sh
   NEXT_PUBLIC_TMDB_API_KEY=<Your API Key>
   ```

4. **Run the development server:**

   ```sh
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

**The code the Node server for generating movie stories and converting text to audio is available [here](https://github.com/ebenezersakyi/video-app-api.git).**

## Approach and Trade-offs

### Approach

- **Next.js and TypeScript:** Chose Next.js for its powerful features like server-side rendering and API routes. TypeScript ensures type safety and better developer experience.
- **Tailwind CSS:** Used Tailwind CSS for rapid UI development and to challenge myself as I usually prefer plain CSS.
- **Express Server:** Used Node.js and Express to handle story generation and text-to-audio conversion.

### Trade-offs

- **Learning Curve:** Tailwind CSS has a steeper learning curve compared to plain CSS, but it significantly sped up the styling process once I got the hang of it.
- **Performance:** Opted for server-side rendering to improve SEO and initial load performance, but this comes with the cost of increased server load.

## Additional Features

- **Story Generator using Google Gemini:** Generates a story for each movie using Google Gemini API.
- **Text to Audio Generation using Google Cloud:** Converts generated text stories to audio using Google Cloud Text-to-Speech.
- **Direct Movie Social Media Sharing:** Allows users to share movies directly on social media platforms.
- **Responsive Design:** Ensures a great user experience across all devices.

## Testing

- **Jest:** Used Jest for testing the application. Run tests with the following command:

  ```sh
  npm test
  ```

## Deployment

The application is deployed on Vercel. Visit the live app [here](https://assessment-video.vercel.app/).

To deploy your own instance:

1. **Fork the repository on GitHub.**
2. **Set up a new project on Vercel.**
3. **Link the Vercel project to your GitHub repository.**
4. **Configure the environment variables in Vercel.**
5. **Deploy!**

---

Feel free to contribute to this project by opening issues or submitting pull requests. If you encounter any problems, please create an issue on GitHub. Thank you for checking out My Video App!
