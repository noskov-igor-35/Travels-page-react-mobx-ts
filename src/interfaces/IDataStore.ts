import { IFilterStore } from './IFilterStore';

export interface IDataStore {
    data: IDataStoreItem[],
    pagesCount: number,
    filters: IFilterStore,
    changePageCount: Function,
    getData: Function,
};

export interface IDataStoreItem {
    orderNumber: string, 
    type: string, 
    date: Date, 
    amount: number,
};
