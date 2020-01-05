import { IFilterStore } from './IFilterStore';
import { IDataStore } from './IDataStore';

export interface IPaginationProps {
    filterStore?: IFilterStore,
    dataStore?: IDataStore,
};
