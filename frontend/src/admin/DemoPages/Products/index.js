import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Tables

import ProductsTable from './ProductsTable';

// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

const Products = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {/* Tables */}
                    
                    <Route path={`/products`} component={ProductsTable}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Products;