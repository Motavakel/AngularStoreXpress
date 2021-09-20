export interface Product {
  id: number;
  title: string;
  price: number;
  pictureUrl: string;
  productTypeId: number;
  productBrandId: number;
  productType: string;
  productBrand: string;
  description: string;
  summary: string;
}


export interface Pagination<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  result: T[];
  minPrice: number;
  maxPrice: number;
}
