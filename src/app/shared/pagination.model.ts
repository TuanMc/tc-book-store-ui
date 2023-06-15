export class Pagination<T> {
  page: number;
  limit: number;
  totalPage: number;
  data: T[];

  constructor(data: T[], page: number = 1, limit: number = 10, totalPage: number = 1) {
    this.page = page;
    this.limit = limit;
    this.totalPage = totalPage;
    this.data = data;
  }
}
