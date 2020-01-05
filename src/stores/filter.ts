import { observable, action, configure } from 'mobx';

configure({ enforceActions: 'observed' });

class filterStore {
    @observable filter: string = 'all';
    @observable sorting: string = 'date';
    @observable page: number = 1;

    @action changeFilter(filter: string): void {
        this.filter = filter;
        this.page = 1;
    };
    @action changeSorting(sorting: string): void {
        this.sorting = sorting;
        this.page = 1;
    };
    @action changePage(page: number): void {
        this.page = page;
    };
};

export default new filterStore();