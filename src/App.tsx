import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Rsvp from "./pages/Rsvp";

const queryClient = new QueryClient();

// Component to handle GitHub Pages 404 redirect
const RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check on mount and whenever location changes
  useEffect(() => {
    // Check if we have a stored redirect path from 404.html
    const redirectPath = sessionStorage.getItem("redirectPath");
    if (redirectPath) {
      console.log("RedirectHandler: Found stored path:", redirectPath);
      console.log("RedirectHandler: Current location:", location.pathname);

      // Clear the stored path immediately to prevent loops
      sessionStorage.removeItem("redirectPath");

      // Navigate to the stored path
      if (redirectPath !== location.pathname) {
        console.log("RedirectHandler: Navigating to:", redirectPath);
        // Use setTimeout to ensure navigation happens after render
        setTimeout(() => {
          navigate(redirectPath, { replace: true });
        }, 0);
      } else {
        console.log("RedirectHandler: Already at target path, skipping navigation");
      }
    }
  }, [navigate, location.pathname]);

  // Also check immediately on mount (in case we're already at "/")
  useEffect(() => {
    const redirectPath = sessionStorage.getItem("redirectPath");
    if (redirectPath && location.pathname === "/") {
      console.log("RedirectHandler: Initial mount check - redirecting from / to:", redirectPath);
      sessionStorage.removeItem("redirectPath");
      navigate(redirectPath, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RedirectHandler />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/weekend" element={<Index />} />
            <Route path="/rsvp" element={<Rsvp />} />
            <Route path="/weekend/rsvp" element={<Rsvp />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
