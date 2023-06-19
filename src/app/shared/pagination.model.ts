export class Pagination<T> {
  page: number;
  limit: number;
  totalItems: number;
  data: T[];

  constructor(data?: T[], page?: number, limit?: number, totalItems?: number) {
    this.page = page || 1;
    this.limit = limit || 10;
    this.totalItems = totalItems || 0;
    this.data = data || [];
  }
}
