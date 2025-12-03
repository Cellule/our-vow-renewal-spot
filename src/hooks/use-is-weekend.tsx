import { useSearchParams } from "react-router-dom";

/**
 * Hook to check if the website is in weekend mode based on the `?type=weekend` query parameter
 * @returns true if the query parameter `type` equals `weekend`, false otherwise
 */
export function useIsWeekend() {
  const [searchParams] = useSearchParams();
  return searchParams.get("type") === "weekend";
}
