import * as React from 'react';
import { ITableProps, IColumns, IColumn } from '../interfaces/ITable';
import { IData } from '../interfaces/IView';
import './Table/Table.less';

class Table extends React.Component<ITableProps> {
    getCell(data: IData, config: IColumn): JSX.Element {
        const text = data.hasOwnProperty(config.id) ? data[config.id] : null;
        return <td key={ config.id } className={ config.width === 'max' ? 'Table_maxWidth' : 'Table__fixedWidth' }>
            <div className={ config.className }>{ text }</div>
        </td>
    }
    
    getHeadCell(config: IColumn) {
        return <th key={ config.id } className={ config.width === 'max' ? 'Table_maxWidth' : 'Table__fixedWidth' }>
            <div className={ config.className }>
                { config.title }
            </div>  
        </th>;
    }

    getBody(data: IData[], config: IColumns): JSX.Element[] {
        return data.map((item: IData) => {
            const row: JSX.Element[] = [];
            config.columns.forEach((column: IColumn) => {
                row.push(this.getCell(item, column));
            });
            return <tr key={item[config.id]}>{ row }</tr>;
        });
    }

    getHead(config: IColumns): JSX.Element[] {
        const head = [];

        config.columns.forEach((column) => {
            head.push(this.getHeadCell(column));
        });
        return head;
    }

    render () {
        const {data, columns} = this.props;
        const head: JSX.Element[] = this.getHead(columns);
        const body: JSX.Element[] = this.getBody(data, columns);

        const content: JSX.Element = this.props.data.length
        ? <table className='Table'>
            <thead>
                <tr>
                    { head }
                </tr>
            </thead>
            <tbody>
                { body }
            </tbody>
        </table>
        : <div className='flexbox justify-content--center padding-top--xxl'><b>Нет данных</b></div>
        return content;
    }
}

export default Table;
