import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./contexts/LanguageProvider";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const AppServer = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <Index />
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppServer;
