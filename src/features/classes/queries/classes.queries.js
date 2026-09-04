// TanStack Query
import { queryOptions } from "@tanstack/react-query";

// Shared
import { createQueryKeys } from "@/shared/lib/query";

// API
import { classesAPI } from "../api/classes.api";

export const classesKeys = createQueryKeys("classes");

/** Classes are reference data — they change rarely, so cache them longer. */
const REFERENCE_STALE_TIME = 10 * 60 * 1000;

export const classesQueries = {
  list: () =>
    queryOptions({
      queryKey: classesKeys.lists(),
      queryFn: () => classesAPI.getAll().then((r) => r.data.data),
      staleTime: REFERENCE_STALE_TIME,
    }),
};
