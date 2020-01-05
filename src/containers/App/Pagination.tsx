import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { IPaginationProps } from '../../interfaces/IPagination';
import GroupButtons from '../../components/GroupButtons'

const DELTA_SHOW_PAGES: number = 2;
const ID_FIRST: string = 'first';
const ID_LAST: string = 'last';

@inject('filterStore', 'dataStore')
@observer class Pagination extends React.Component<IPaginationProps> {
    // Метод клика, отсылает id во внешний обработчик
    handlePageChange(page: string) {
        const resPage = page === ID_FIRST ? 1 : page === ID_LAST ? this.props.dataStore.pagesCount : Number(page);
        this.props.filterStore.changePage(resPage);
    }

    constructor(props: IPaginationProps) {
        super(props);

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    render(): JSX.Element {
        const { page } = this.props.filterStore;
        const { pagesCount } = this.props.dataStore;
        const minPage = page - DELTA_SHOW_PAGES > 0 ? page - DELTA_SHOW_PAGES : 1;
        const maxPage = page + DELTA_SHOW_PAGES < pagesCount ? page + DELTA_SHOW_PAGES : pagesCount;
        let pagination;

        // Если пришла максимальная страница и вычислина ширина, то сфомируем пагинацию
        if (maxPage && maxPage !== minPage) {
        
            // Формируем набор, начнем с перехода на первую страницу, потом страницы и в конце переход на последнию
            const items = [{ id: ID_FIRST, title: '<<', }];
            for (let page = minPage; page <= maxPage; page++) {
                items.push({ id: `${ page }`, title: `${ page }`, });
            }
            items.push({ id: ID_LAST, title: '>>', })

            // Формируем пагинатор из набора
            pagination = <GroupButtons selectedKey = { `${page}` }
                                       items = { items }
                                       handleChange = { this.handlePageChange }/>
        }
        return (
            <div>
                { pagination }
            </div>
        );
    }
}

export default Pagination;
