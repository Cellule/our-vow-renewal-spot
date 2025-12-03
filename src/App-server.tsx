import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StaticRouter } from "react-router-dom/server";
import { LanguageProvider } from "./contexts/LanguageProvider";
import Index from "./pages/Index";

const queryClient = new QueryClient();

interface AppServerProps {
  url: string;
}

const AppServer = ({ url }: AppServerProps) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <StaticRouter location={url}>
          <Index />
        </StaticRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppServer;
