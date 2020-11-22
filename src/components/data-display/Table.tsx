import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { CustomTheme } from '../../theme';
import { TableOptions, useSortBy, useTable } from 'react-table';
import CaretDown from '../../resources/svg/caret-down.svg';
import Skeleton from 'react-loading-skeleton';

const useStyles = createUseStyles<CustomTheme>((theme) => ({
    table: {
        borderCollapse: 'collapse',
        fontSize: theme.fontSize.sm,
        width: '100%',
        maxWidth: '880px',
    },
    header: {
        borderBottom: `${theme.colors.black} 1px solid`,
    },
    th: {
        color: theme.colors.primary,
        fontWeight: 'normal',
        textAlign: 'start',
        padding: '5px',
    },
    tr: {
        borderBottom: `${theme.colors.grey} 1px solid`,
    },
    td: {
        padding: '5px',
    },
    sortSymbol: {
        width: '30px',
        height: '10px',
        fill: theme.colors.primary,
        transition: 'transform 0.3s',
    },
    sortAsc: {
        transform: 'rotate(180deg)',
    },
}));

interface Props<T extends Record<keyof T, unknown>> extends TableOptions<T> {
    data: T[];
    loading: boolean;
}

const Table = <T extends Record<keyof T, unknown>>({
    data,
    loading,
    columns,
}: Props<T>): ReactElement => {
    const classes = useStyles();
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>(
        {
            columns,
            data,
            initialState: {
                sortBy: [{ id: 'name' }],
            },
            disableSortRemove: true,
        },
        useSortBy,
    );

    return (
        <table className={classes.table} {...getTableProps()}>
            <thead className={classes.header}>
                {headerGroups.map((headerGroup) => {
                    const {
                        key: headerGrpKey,
                        ...headerGrpProps
                    } = headerGroup.getHeaderGroupProps();
                    return (
                        <tr key={headerGrpKey} {...headerGrpProps}>
                            {headerGroup.headers.map((column) => {
                                const { key: headerKey, ...headerProps } = column.getHeaderProps(
                                    column.getSortByToggleProps(),
                                );
                                return (
                                    <th className={classes.th} key={headerKey} {...headerProps}>
                                        {column.render('Header')}
                                        {column.isSorted && (
                                            <CaretDown
                                                className={`${classes.sortSymbol} ${
                                                    !column.isSortedDesc && classes.sortAsc
                                                }`}
                                            />
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    );
                })}
            </thead>
            <tbody {...getTableBodyProps()}>
                {loading ? (
                    <tr>
                        <td colSpan={columns.length}>
                            <Skeleton count={10} height={30} />
                        </td>
                    </tr>
                ) : (
                    rows.map((row) => {
                        prepareRow(row);
                        const { key: rowKey, ...rowProps } = row.getRowProps();
                        return (
                            <tr className={classes.tr} key={rowKey} {...rowProps}>
                                {row.cells.map((cell) => {
                                    const { key: cellKey, ...cellProps } = cell.getCellProps();
                                    return (
                                        <td className={classes.td} key={cellKey} {...cellProps}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })
                )}
            </tbody>
        </table>
    );
};

export default Table;
