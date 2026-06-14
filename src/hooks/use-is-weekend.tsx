import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

/**
 * Hook to check if the website is in weekend mode based on either:
 * - The `/weekend` path, or
 * - The `?type=weekend` query parameter
 * @returns true if either the path is `/weekend` or the query parameter `type` equals `weekend`, false otherwise
 */
export function useIsWeekend() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Also check window.location.pathname directly as a fallback
  // This is important for GitHub Pages where React Router might not have initialized yet
  const [windowPathname, setWindowPathname] = useState<string>(typeof window !== "undefined" ? window.location.pathname : "/");

  // Update window pathname on mount and when location changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowPathname(window.location.pathname);
    }
  }, [location.pathname]);

  const isPathWeekend = (path: string) => path.startsWith("/weekend") || path.startsWith("/weekend/");

  // Check both React Router location and window.location as fallback
  const isWeekend = isPathWeekend(location.pathname) || isPathWeekend(windowPathname) || searchParams.get("type") === "weekend";

  return isWeekend;
}
