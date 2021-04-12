import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';

import {
    ToastContainer,
} from 'react-toastify';

const Dashboards = lazy(() => import('../../DemoPages/Dashboards'));
const Users = lazy(() => import('../../DemoPages/Users'));
const Products = lazy(() => import('../../DemoPages/Products'));
const Widgets = lazy(() => import('../../DemoPages/Widgets'));
const Elements = lazy(() => import('../../DemoPages/Elements'));
const Components = lazy(() => import('../../DemoPages/Components'));
const Charts = lazy(() => import('../../DemoPages/Charts'));
const Forms = lazy(() => import('../../DemoPages/Forms'));
const Tables = lazy(() => import('../../DemoPages/Tables'));
const UserEditPage = lazy(() => import('../../DemoPages/UserEditPage'));
const UserCreatePage = lazy(() => import('../../DemoPages/UserCreatePage'));
const ProductEditPage = lazy(() => import('../../DemoPages/ProductEditPage'));
const ProductCreatePage = lazy(() => import('../../DemoPages/ProductCreatePage'));
const Orders = lazy(() => import('../../DemoPages/Orders'));
const OrderEditPage = lazy(() => import('../../DemoPages/OrderEditPage'));


const AppMain = () => {

    return (
        <Fragment>

            {/* Components */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Loading ...
                            <small>Because this is a demonstration we load at once all the Components examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/components" component={Components}/>
            </Suspense>

            {/* Users */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Loading ...
                            <small>Because this is a demonstration we load at once all the Forms examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/users" component={Users}/>
            </Suspense>

            {/* Edit Users */}
            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Loading ...
                            <small>Because this is a demonstration we load at once all the Forms examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/user/edit/:id" component={UserEditPage}/>
            </Suspense>

            {/* Create Users */}
            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Loading ...
                            <small>Because this is a demonstration we load at once all the Forms examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/user/create" component={UserCreatePage}/>
            </Suspense>


            {/* Products */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Loading ...
                            <small>Because this is a demonstration we load at once all the Forms examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/product/edit/:id" component={ProductEditPage}/>
            </Suspense>

            {/*Edit Products */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Loading ...
                            <small>Because this is a demonstration we load at once all the Forms examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/products" component={Products}/>
            </Suspense>

            {/*Create Products */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Loading ...
                            <small>Because this is a demonstration we load at once all the Forms examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/product/create" component={ProductCreatePage}/>
            </Suspense>

            {/*Orders */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Loading ...
                            <small>Because this is a demonstration we load at once all the Forms examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/orders" component={Orders}/>
            </Suspense>

            {/*Edit Orders */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Loading ...
                            <small>Because this is a demonstration we load at once all the Forms examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/order/edit/:id" component={OrderEditPage}/>
            </Suspense>


            {/* Forms */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Loading ...
                            <small>Because this is a demonstration we load at once all the Forms examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/forms" component={Forms}/>
            </Suspense>

            {/* Charts */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Loading ...
                            <small>Because this is a demonstration we load at once all the Charts examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/charts" component={Charts}/>
            </Suspense>

            {/* Tables */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Loading ...
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/tables" component={Tables}/>
            </Suspense>

            {/* Elements */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Loading ...
                            <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/elements" component={Elements}/>
            </Suspense>

            {/* Dashboard Widgets */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Loading ...
                            <small>Because this is a demonstration we load at once all the Dashboard Widgets examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/widgets" component={Widgets}/>
            </Suspense>

            {/* Dashboards */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Loading
                            <small>Because this is a demonstration, we load at once all the Dashboards examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/dashboards" component={Dashboards}/>
            </Suspense>

            <Route exact path="/" render={() => (
                <Redirect to="/dashboards"/>
            )}/>
            <ToastContainer/>
        </Fragment>
    )
};

export default AppMain;