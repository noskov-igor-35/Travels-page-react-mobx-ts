import { IDataStoreItem } from './IDataStore';

export interface ITableProps {
    data?: any[],
    columns: any,
};

export interface IColumns {
    id: string|number,
    columns: IColumn[]
}

export interface IColumn {
    id: string|number,
    title?: string,
    className?: string,
    width?: string,
}