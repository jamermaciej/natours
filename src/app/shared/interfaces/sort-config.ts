export interface SortConfig<T = unknown> {
  field: T | null;
  direction: SortDirection;
}

export type SortDirection = 'asc' | 'desc' | null;
