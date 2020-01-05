import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { IFilterProps } from '../../interfaces/IFilter';
import GroupButtons from '../../components/GroupButtons';

@inject('filterStore', 'dataStore')
@observer class Filter extends React.Component<IFilterProps> {
    // Метод клика, отсылает id во внешний обработчик
    handleFilterChange(filter: string) {
        this.props.filterStore.changeFilter(filter);
        this.props.dataStore.changePageCount(null);
    }

    constructor(props: IFilterProps) {
        super(props);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    render(): JSX.Element {
        return (
            <div>
                <GroupButtons selectedKey = { this.props.filterStore.filter }
                              items = {[
                                  { id: 'all', title: 'Все заказы' },
                                  { id: 'avia', title: 'Авиабилеты' },
                                  { id: 'hotel', title: 'Отели' },
                                  { id: 'railways', title: 'ЖД билеты' },
                                  { id: 'cars', title: 'Аренда авто' }
                              ]}
                              handleChange = { this.handleFilterChange }/>
            </div>
        );
    }
}

export default Filter;
