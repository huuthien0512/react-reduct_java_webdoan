import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";

const Admin = lazy(() => import("./admin/index"));
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Product = lazy(() => import("./pages/Product"));
const Blog = lazy(() => import("./pages/Blog"));

const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const LoginRegister = lazy(() => import("./pages/LoginRegister"));

const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Compare = lazy(() => import("./pages/Compare"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Paypal = lazy(() => import("./pages/Paypal"));

const NotFound = lazy(() => import("./pages/NotFound"));

const App = ({userLogin}) => {
  // useEffect(() => {
  //   props.dispatch(
  //     loadLanguages({
  //       languages: {
  //         en: require("./translations/english.json"),
  //         fn: require("./translations/french.json"),
  //         de: require("./translations/germany.json")
  //       }
  //     })
  //   );
  // });

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={Home}
                />

                {/* Admin */}
                <Route
                  path={process.env.PUBLIC_URL + "/admin"}
                  component={userLogin && userLogin.isAdmin?Admin:NotFound}
                />
                {/* Homepages */}
                <Route path={process.env.PUBLIC_URL + "/home"} component={Home}/>
                {/* Shop pages */}
                <Route path={process.env.PUBLIC_URL + "/shop"} component={Shop}/>
                {/* Shop product pages */}
                <Route path={process.env.PUBLIC_URL + "/product/:id"}
                  render={(routeProps) => (
                    <Product {...routeProps} key={routeProps.match.params.id} />
                  )}
                />

                {/* Blog pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/blog"}
                  component={Blog}
                />

                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/about"}
                  component={About}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={LoginRegister}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={Cart}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/compare"}
                  component={Compare}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/paypal"}
                  component={Paypal}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/not-found"}
                  component={NotFound}
                />

              




                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
  userLogin: PropTypes.func
};
const mapStateToProps = state => {
  return {
    userLogin: state.loginData.userInfo,
  };
};
export default connect(mapStateToProps)(multilanguage(App));
