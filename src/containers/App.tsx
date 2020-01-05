import * as React from 'react';

import { Provider } from 'mobx-react';
import store from '../stores/store';

import Filter from './App/Filter';
import Sorting from './App/Sorting';
import View from './App/View';
import Pagination from './App/Pagination';

import './App/App.less';

function App(): JSX.Element {
    return (
        <div className='App'>
            <Provider Provider {...store}>
                <div className='flexbox flex-direction--column padding--xl default-font-size'>
                    <div className='flexbox justify-content--space-between flex-direction--column-sm'>
                        <div className='padding-bottom--l'>
                            <Filter/>
                        </div>
                        <div className='padding-bottom--l'>
                            <Sorting/>
                        </div>
                    </div>
                    <div className='padding-bottom--xl'>
                        <View/>
                    </div>
                    <div className='flexbox justify-content--center'>
                        <Pagination/>
                    </div>
                </div>
            </Provider>
        </div>
    );
};

export default App;
