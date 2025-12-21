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

  return location.pathname === "/weekend" || searchParams.get("type") === "weekend";
}
