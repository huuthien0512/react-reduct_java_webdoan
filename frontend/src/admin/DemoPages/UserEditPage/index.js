import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Tables

import UserEditPage from './UserEditPage';

// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

const UserEdit = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {/* Tables */}
                    
                    <Route path={`/user/edit/:id`} component={UserEditPage}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default UserEdit;