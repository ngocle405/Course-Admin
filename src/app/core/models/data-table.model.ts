export interface DataTable<M> {
  totalPages: number;
  totalElements: number;
  currentPage: number;
  size: number;
  content: M[];
  totalRecords: number;
  // first:number;
  //status:boolean| string;
}
