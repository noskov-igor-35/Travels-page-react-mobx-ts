import { observable, action, runInAction, configure } from 'mobx';
import RequestPath from '../requestPath';
import { IDataStoreItem } from '../interfaces/IDataStore';
import { IFilterStore } from '../interfaces/IFilterStore'

configure({ enforceActions: 'observed' });

const PAGE_SIZE: number = 10;

class dataStore {
    @observable data: IDataStoreItem[] = null;
    @observable pagesCount: number = null;
    @observable filters: IFilterStore = {
        filter: null,
        sorting: null,
        page: null
    };

    @action changePageCount(pagesCount: number): void {
        this.pagesCount = pagesCount;
    }

    @action.bound getData(filter: string, sorting: string, page: number): void {
        if (this.filters.filter !== filter || this.filters.sorting !== sorting || this.filters.page !== page) {
            this.filters = {
                filter,
                sorting,
                page,
            }
            this.data = null;
            
            fetch(RequestPath)
            .then((response: Response) => response.json())
            .then((json: IDataStoreItem[]) => {
                // Приводим к удобному формату
                let data: IDataStoreItem[] = json.map((item: IDataStoreItem) => {
                    item.date = new Date(item.date);
                    return item;
                });

                // Фильтруем данные
                if (filter !== 'all') {
                    data = data.filter(item => item.type === filter);
                }

                // Сортируем
                data.sort((prev, curr) => curr[sorting] - prev[sorting]);

                //Если пропсы не изменились, то ответ акутальный
                if (this.filters.filter === filter || this.filters.sorting === sorting || this.filters.page === page) {
                    runInAction(() => {
                        this.changePageCount(Math.ceil(data.length / PAGE_SIZE));
                        this.data = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
                    })
                }
            });
        }
    };
};

export default new dataStore();