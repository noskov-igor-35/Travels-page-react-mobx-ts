export interface IFilterStore {
    filter: string, 
    sorting: string, 
    page: number,
    changeFilter?: Function,
    changeSorting?: Function,
    changePage?: Function,
};
