import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { LanguageProvider } from "./contexts/LanguageProvider";
import Index from "./pages/Index";
import Photos from "./pages/Photos";

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
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/weekend" element={<Index />} />
            <Route path="/photos" element={<Photos />} />
          </Routes>
        </StaticRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppServer;
