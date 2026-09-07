export const REDIRECTS = [
  {
    path: "photos",
    envVar: "VITE_PHOTOS_URL",
    fallback: "/",
    title: "Photos - Andréanne & Michaël",
  },
  {
    path: "intro",
    envVar: "VITE_INTRO_URL",
    fallback: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Redirection",
  },
];
