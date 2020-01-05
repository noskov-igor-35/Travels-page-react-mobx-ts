import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { ISortingProps } from '../../interfaces/ISorting';
import Dropdown from '../../components/Dropdown';

@inject('filterStore', 'dataStore')
@observer class Sorting extends React.Component<ISortingProps> {
    // Метод клика, отсылает id во внешний обработчик
    handleSortingChange(sorting: string) {
        this.props.filterStore.changeSorting(sorting);
        this.props.dataStore.changePageCount(null);
    }

    constructor(props: ISortingProps) {
        super(props);
        this.handleSortingChange = this.handleSortingChange.bind(this);
    }

    render(): JSX.Element {
        return (
            <div>
                <Dropdown selectedKey = { this.props.filterStore.sorting }
                          items = {[
                              { id: 'date', title: 'По дате создания' },
                              { id: 'amount', title: 'По стоимости' }
                          ]}
                          handleChange = {this.handleSortingChange}/>
            </div>
        );
    }
}

export default Sorting;
