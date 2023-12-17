import { NextResponse } from "next/server";
export interface IDataTable<T> {
  count: number;
  results: T[];
}
export interface IHeadConfig {
  name: string;
  rowName?: string;
  sort?: boolean;
}

export interface ISortBy {
  name: string;
  rowName: string;
  sort: string;
}

export type ColumnLambda = (row: any) => React.ReactNode;

export type TableHandler = (row?: any) => void;

export type GetOne = (id: number) => Promise<NextResponse<any>>;
