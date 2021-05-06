import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Tables

import OrdersTable from './OrdersTable';

// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

const Orders = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {/* Tables */}
                    
                    <Route path={`/orders`} component={OrdersTable}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Orders;