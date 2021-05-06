import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Tables

import ProductEditPage from './ProductEditPage';

// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

const ProductEdit = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {/* Tables */}
                    
                    <Route path={`/product/edit/:id`} component={ProductEditPage}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default ProductEdit;