import { useEffect } from "react";

const DESTINATION = "https://guests.camera/e/mariage-andreanne-michael";

const Photos = () => {
  useEffect(() => {
    window.location.replace(DESTINATION);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        <h1 className="text-2xl font-bold mb-2">Redirection en cours...</h1>
        <p className="text-muted-foreground mb-4">Vous allez être redirigé vers la galerie photo.</p>
        <p className="text-sm text-muted-foreground mb-6">Redirecting to the photo gallery.</p>
        <a href={DESTINATION} className="text-primary underline hover:text-primary/80">
          Cliquez ici si vous n'êtes pas redirigé / Click here if you are not redirected
        </a>
      </div>
    </div>
  );
};

export default Photos;
