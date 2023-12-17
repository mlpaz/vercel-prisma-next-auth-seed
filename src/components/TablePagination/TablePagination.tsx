import React from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import styles from "./TablePagination.module.css";

export interface IPage {
  total: number;
  limit: number;
  offset: number;
}

const limits: number[] = [5, 10, 20, 50];

function TablePagination({
  page,
  setPage,
  fetchData,
}: {
  page: IPage;
  setPage: any;
  fetchData: any;
}) {
  const { total, limit, offset } = page;

  async function handlerSetLimit(newLimit: number) {
    const newPage: IPage = {
      ...page,
      offset: 0,
      limit: newLimit,
    };
    setPage(newPage);
    fetchData(newPage);
  }

  async function next() {
    const newPage: IPage = {
      ...page,
      offset: offset + limit,
    };
    setPage(newPage);
    fetchData(newPage);
  }

  async function prev() {
    const newPage: IPage = {
      ...page,
      offset: offset - limit,
    };
    setPage(newPage);
    fetchData(newPage);
  }

  return (
    <div className={styles.container}>
      <div className="flex items-center">
        <label className="text-black mr-3 "> Limite </label>
        <select
          value={page.limit}
          id="selectLimit"
          onChange={(e) => handlerSetLimit(+e.target.value)}
          className={styles.select}
        >
          {limits.map((i) => (
            <option key={i}> {i} </option>
          ))}
        </select>
      </div>

      <span className={styles.infoContainer}>
        <span className="text-gray-500 ">{offset + 1}</span> a{" "}
        <span className=" text-gray-500 ">
          {total < offset + limit ? total : offset + limit}
        </span>{" "}
        de <span className="text-gray-500 ">{total}</span> registros
      </span>

      <div className="inline-flex">
        <button
          className={styles.arrowButon}
          disabled={offset - limit < 0}
          onClick={prev}
        >
          <ChevronLeft />
        </button>
        <button
          className={styles.arrowButon}
          disabled={offset + limit > total}
          onClick={next}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default TablePagination;
