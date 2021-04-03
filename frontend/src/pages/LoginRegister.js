import PropTypes from "prop-types";
import React, { Fragment,useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Layout from "../layouts/Layout";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import {login, register} from '../redux/actions/userActions';
import { connect } from "react-redux";

const LoginRegister = ({ location, login, register, userLogin, history}) => {
  
  const { pathname } = location;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const redirect=location.search?location.search.split('=')[1]:'/'
  
  useEffect(()=>{
    if(userLogin){
      history.push(redirect)
    }
  },[history, userLogin, redirect]);
  
  const submitHandler=(e)=>{
      e.preventDefault();
      login(username,password)
  }


  return (
    
    <Fragment>
      <MetaTags>
        <title>Flone | Login</title>
        <meta
          name="description"
          content="Trang đăng nhập / đăng ký."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang Chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Đăng Nhập Đăng Ký
      </BreadcrumbsItem>
      <Layout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Đăng nhập</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Đăng ký</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login" >
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={submitHandler}>
                              <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value = {username}
                                onChange={(e)=>setUsername(e.target.value)}
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                                value = {password}
                                onChange={(e)=>setPassword(e.target.value)}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Quên mật khẩu?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Đăng nhập</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Username"
                                value = {username}
                                onChange={(e)=>setUsername(e.target.value)}
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                                value = {password}
                                onChange={(e)=>setPassword(e.target.value)}
                              />
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                                value = {email}
                                onChange={(e)=>setEmail(e.target.value)}
                              />
                              <div className="button-box">
                                <button type="submit" onClick={() => register(username, password, email)}>
                                  <span>Đăng ký</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object,
  login: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  userLogin: PropTypes.object
};
const mapStateToProps = state => {
  return {
    userLogin: state.loginData.users
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: (username,password) => {
      dispatch(login(username,password));
    },
    register: (username,password, email) => 
    {dispatch(register(username,password, email));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);
