/* eslint-disable @typescript-eslint/no-empty-interface,@typescript-eslint/ban-types */
/* interfaces have to match exiting definitions hence use of object */
import {
    UseSortByColumnOptions,
    UseSortByColumnProps,
    UseSortByHooks,
    UseSortByInstanceProps,
    UseSortByOptions,
    UseSortByState,
} from 'react-table';

/**
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-table/Readme.md
 */
declare module 'react-table' {
    export interface TableOptions<D extends object> extends UseSortByOptions<D> {}

    export interface Hooks<D extends object = {}> extends UseSortByHooks<D> {}

    export interface TableInstance<D extends object = {}> extends UseSortByInstanceProps<D> {}

    export interface TableState<D extends object = {}> extends UseSortByState<D> {}

    export interface ColumnInterface<D extends object = {}> extends UseSortByColumnOptions<D> {
        absoluteSorting?: boolean;
    }

    export interface ColumnInstance<D extends object = {}> extends UseSortByColumnProps<D> {}
}
