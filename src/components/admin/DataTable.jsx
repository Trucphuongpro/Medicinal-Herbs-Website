import styles from './AdminShared.module.css';

function DataTable({ columns, data, emptyState }) {
  if (!data.length) {
    return emptyState || null;
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id || row.code || row.name}>
              {columns.map((column) => (
                <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.mobileCards}>
        {data.map((row) => (
          <article key={row.id || row.code || row.name} className={styles.mobileCard}>
            {columns.map((column) => (
              <div key={column.key} className={styles.mobileRow}>
                <span className={styles.mobileLabel}>{column.label}</span>
                <div className={styles.mobileValue}>{column.render ? column.render(row) : row[column.key]}</div>
              </div>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
}

export default DataTable;
