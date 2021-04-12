import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Tables

import UserCreatePage from './UserCreatePage';

// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

const UserCreate = () => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {/* Tables */}
                    
                    <Route path={`/user/create`} component={UserCreatePage}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default UserCreate;