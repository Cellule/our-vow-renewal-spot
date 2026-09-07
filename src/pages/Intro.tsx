import { useEffect } from "react";

const DESTINATION = import.meta.env.VITE_INTRO_URL || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

const Intro = () => {
  useEffect(() => {
    window.location.replace(DESTINATION);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        <p className="text-muted-foreground">Redirection...</p>
        <a href={DESTINATION} className="text-primary underline hover:text-primary/80 text-sm mt-4 inline-block">
          Cliquez ici si vous n'êtes pas redirigé
        </a>
      </div>
    </div>
  );
};

export default Intro;
