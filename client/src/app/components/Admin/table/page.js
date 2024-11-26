import React from 'react';
import { useTable, usePagination } from 'react-table';
import './page.css';

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, 
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 6 }, // Show 6 rows per page
    },
    usePagination
  );

  const renderPageButtons = () => {
    const buttons = [];
    const totalPages = pageOptions.length;
    const startPage = Math.max(0, pageIndex - 1);
    const endPage = Math.min(totalPages, pageIndex + 2);

    for (let i = startPage; i < endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => gotoPage(i)}
          className={i === pageIndex ? 'active' : ''}
        >
          {i + 1}
        </button>
      );
    }

    return buttons;
  };

  return (
    <>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => {
            const { key, ...restHeaderProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderProps}>
                {headerGroup.headers.map(column => {
                  const { key, ...restColumnProps } = column.getHeaderProps();
                  return (
                    <th key={key} {...restColumnProps}>
                      {column.render('Header')}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr key={key} {...restRowProps}>
                {row.cells.map(cell => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={key} {...restCellProps}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        {renderPageButtons()}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
      </div>
    </>
  );
};

export default Table;
