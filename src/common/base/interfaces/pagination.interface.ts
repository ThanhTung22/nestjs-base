export interface IPagination<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}
