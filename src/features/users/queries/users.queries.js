// TanStack Query
import { queryOptions } from "@tanstack/react-query";

// Shared
import { createQueryKeys } from "@/shared/lib/query";

// API
import { usersAPI } from "../api/users.api";

export const usersKeys = createQueryKeys("users");

export const usersQueries = {
  /**
   * All users, short form (id, firstName, lastName, role). Reference list for
   * pickers; filter by role client-side where needed.
   */
  allShort: () =>
    queryOptions({
      queryKey: [...usersKeys.all, "all-short"],
      queryFn: () => usersAPI.getAllShort().then((r) => r.data.data),
      staleTime: 10 * 60 * 1000,
    }),
};
