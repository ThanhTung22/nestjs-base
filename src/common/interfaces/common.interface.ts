export interface IEssentialProperties {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPagination<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}
