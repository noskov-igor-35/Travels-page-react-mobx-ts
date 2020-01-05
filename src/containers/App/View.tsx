import * as React from 'react';
import { observer, inject } from 'mobx-react';
import Table from '../../components/Table';
import Indicator from '../../components/Indicator';
import { IViewProps, IData } from '../../interfaces/IView';
import { IDataStoreItem } from '../../interfaces/IDataStore';
import { IColumns } from '../../interfaces/ITable';

const DOUBLE_DIGIT: number = 10;

@inject('filterStore', 'dataStore')
@observer class View extends React.Component<IViewProps> {
    getDate(date: Date): string {
        // Сформируем даты в нужных форматах
        const day: string = date.getDate() < DOUBLE_DIGIT ? `0${ date.getDate() }` : `${date.getDate()}`;
        const month: string = date.getMonth() + 1 < DOUBLE_DIGIT? `0${ date.getMonth() + 1 }`: `${date.getMonth() + 1}`;
        const hour: string = date.getHours() < DOUBLE_DIGIT ? `0${ date.getHours() }` : `${date.getHours()}`;
        const minutes: string = date.getMinutes() < DOUBLE_DIGIT ? `0${ date.getMinutes() }` : `${date.getMinutes()}`;
        return `${ day }.${ month }.${ date.getFullYear() } ${ hour }:${ minutes }`;
    }

    getType(typeId: string): string {
        let type: string;
        switch (typeId) {
            case 'avia':
                type = 'Авиа';
                break;
            case 'hotel':
                type = 'Отель';
                break;
            case 'railways':
                type = 'ЖД';
                break;
            default:
                type = 'Авто';
        }
        return type;
    }

    getMoney(sum: number): string {
        return `${sum.toLocaleString('ru-RU')} р.`;
    }

    render(): JSX.Element {
        const { filter, sorting, page } = this.props.filterStore;
        const { data } = this.props.dataStore;

        const items: IData[] = data ? data.map((item: IDataStoreItem): IData => {
            return {
                order: item.orderNumber,
                type: this.getType(item.type),
                date: this.getDate(item.date),
                sum: this.getMoney(item.amount),
            }
        }) : [];

        const columns: IColumns = {
            id: 'order',
            columns: [
                { id: 'order', title: '#', className: 'flexbox', },
                { id: 'type', title: 'Вид заказа', className: 'flexbox justify-content--center white-space--nowrap', }, 
                { id: 'date', title: 'Дата', className: 'flexbox justify-content--center', width: 'max', },
                { id: 'sum', title: 'Стоимость', className: 'flexbox justify-content--end', },
            ],
        }

        const view = data ? <Table data={ items } columns={ columns }/> : <Indicator/>
        return (
            <div>
                { view }
            </div>
        );
    }

    componentDidMount(): void {
        const { filter, sorting, page } = this.props.filterStore;
        this.props.dataStore.getData(filter, sorting, page);
    }

    componentDidUpdate(): void {
        const { filter, sorting, page } = this.props.filterStore;
        this.props.dataStore.getData(filter, sorting, page);
    }
}

export default View;
