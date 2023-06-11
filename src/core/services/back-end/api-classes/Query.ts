export class Query {
  limit: number = 20;
  offset: number = 0;
  sortBy?: string = '';
  date?: Date | null = null;
  search?: string = '';
  ids: number[] = [];

  constructor(query: any) {
    this.limit = +query.limit || this.limit;
    this.offset = +query.offset || this.offset;
    this.sortBy = query.sortBy || this.sortBy;
    this.date = new Date(query.date) || this.date;
    this.search = query.search || this.search;

    if (query.ids && !Array.isArray(query.ids)) {
      this.ids = [query.ids].map((value: string | number) => +value) || this.ids;
      return;
    }

    this.ids = query.ids?.map((value: string | number) => +value) || this.ids;
  }

}
