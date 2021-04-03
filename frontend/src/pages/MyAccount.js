import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect} from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Layout from "../layouts/Layout";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import { connect } from "react-redux";
import  { Redirect } from 'react-router-dom'
import { updateProfile, updatePassword } from "../redux/actions/userActions";


const MyAccount = ({ history, location, userLogin, updateProfile, updatePassword}) => {
  const { pathname } = location;
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  useEffect(() => {
    if (userLogin) {
      console.log(userLogin.username)
      setUsername(userLogin.username);
      setFirstname(userLogin.firstname);
      setLastname(userLogin.lastname);
      setEmail(userLogin.email);
      setTelephone(userLogin.telephone);
    } else {
      history.push('/login-register');
    }
  }, [userLogin, Redirect, history]);

  const newInfo={
    firstname:firstname,
    password:password,
    email:email,
    telephone:telephone,
  }

  const newInfoPassword={
    password:password,
  }

  const submitHandlerUpdateProfile=(e)=>{
    e.preventDefault();
      updateProfile(newInfo, userLogin);
  }

  const submitHandlerUpdatePassword=(e)=>{
    e.preventDefault();
      updatePassword(newInfoPassword, userLogin);
  }

  return (
    <Fragment>
      <MetaTags>
        <title>H2O | Tài Khoản Của Tôi</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang Chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Tài Khoản
      </BreadcrumbsItem>
      <Layout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Sửa đổi thông tin tài khoản{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Thông tin tài khoản của bạn</h4>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Họ</label>
                                  <input type="text"
                                    value={firstname}
                                    onChange={(e)=>setFirstname(e.target.value)}
                                    />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Tên</label>
                                  <input type="text" 
                                  value={lastname}
                                  onChange={(e)=>setLastname(e.target.value)}/>
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Email</label>
                                  <input type="email"
                                  value={email}
                                  onChange={(e)=>setEmail(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Số điện thoại</label>
                                  <input type="text" 
                                  value={telephone}
                                  onChange={(e)=>setTelephone(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit" onClick={submitHandlerUpdateProfile}>Cập nhật</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Thay đổi mật khẩu
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Mật khẩu</label>
                                  <input type="password" 
                                  value={password}
                                  onChange={(e)=>setPassword(e.target.value)}/>
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Nhập lại mật khẩu</label>
                                  <input type="password" 
                                  value={newPassword}
                                  onChange={(e)=>setNewPassword(e.target.value)}/>
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit" onClick={submitHandlerUpdatePassword}>Thay đổi</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};


const mapStateToProps = state => {
  return {
    userLogin: state.loginData.users,
  };
};
const mapDispatchToProps = dispatch => {
  
  return {
    updateProfile: (newInfo, userLogin) => {
      dispatch(updateProfile(newInfo, userLogin));
    },
    updatePassword: (newInfoPassword, userLogin) => {
      dispatch(updatePassword(newInfoPassword, userLogin));
    }
  };
};
MyAccount.propTypes = {
  location: PropTypes.object,
  updateProfile: PropTypes.func,
  userLogin: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
