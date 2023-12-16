import { useId } from "react";
import { ColumnLambda, IDataTable, IHeadConfig } from "./interface";

import styles from "./Table.module.css";

function Table({
  headers,
  columns,
  data,
}: {
  headers: IHeadConfig[];
  columns: ColumnLambda[];
  data: IDataTable | undefined;
}) {
  const reactRowId = useId();
  const reactColumnId = useId();
  const columnLimit = columns?.length;
  const isEmpty = data?.results?.length === 0;

  return (
    <div>
      {!isEmpty && (
        <table className={styles.table}>
          <thead className={styles.tableHeadWrapper}>
            <tr>
              {headers.map((head: IHeadConfig, index: number) => (
                <th key={`${head.name}-${index}`} className={styles.tableHead}>
                  <p className={styles.columnTitle}>{head.name}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.results?.map((row: any, i: number) => {
              const rowId = `${reactRowId}-${i}`;
              return (
                <tr key={rowId}>
                  {columns.map((c, ci) => (
                    <td
                      key={`${reactColumnId}-${i * columnLimit + ci}`}
                      className={styles.tableBody}
                    >
                      {c(row)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {isEmpty && (
        <div className={styles.emptyTableWrapper}>
          <span className={styles.emptyTableMessage}>
            No hay registros disponibles
          </span>
        </div>
      )}
    </div>
  );
}

export default Table;
