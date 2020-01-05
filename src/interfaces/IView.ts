import { IFilterStore } from './IFilterStore';
import { IDataStore } from './IDataStore';

export interface IViewProps {
    filterStore?: IFilterStore,
    dataStore?: IDataStore,
}

export interface IData {
    order: string,
    type?: string,
    date?: string,
    sum: string,
}