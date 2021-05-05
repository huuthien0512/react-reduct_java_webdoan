import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect} from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Layout from "../layouts/Layout";
import Breadcrumb from "../wrappers/Breadcrumb";
import { connect } from "react-redux";
import  { Redirect } from 'react-router-dom'
import { updateProfile, updatePassword } from "../redux/actions/userActions";
import { getMyListOrder } from "../redux/actions/orderActions";

import Message from '../components/Message';
import Loader from '../admin/DemoPages/Components/Loader';
import { Button, Table } from 'react-bootstrap';
import {
  Row, Col,
  CardBody,
  CardTitle
} from 'reactstrap';
import {AiFillCheckCircle,AiOutlineCloseCircle,AiFillEdit,AiOutlineDelete} from 'react-icons/ai'


const MyAccount = ({ history, location, userLogin, updateProfile, updatePassword, loadingUpdateProfile, messageUpdateProfile, loadingUpdatePassword, messageUpdatePassword, errorUpdatePassword, myOrderList, getMyListOrder}) => {
  const { pathname } = location;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  useEffect(() => {
    getMyListOrder(userLogin.id);
  }, [])

  useEffect(() => {
    if (userLogin) {
      setUsername(userLogin.username);
      setFirstname(userLogin.firstname);
      setLastname(userLogin.lastname);
      setEmail(userLogin.email);
      setTelephone(userLogin.telephone);
    } else {
      history.push('/login-register');
    }
  }, [userLogin, history]);

  const submitHandlerUpdateProfile=(e)=>{
    e.preventDefault();
    const newInfo={
      firstname:firstname,
      lastname:lastname,
      password:password,
      email:email,
      telephone:telephone,
    }
    updateProfile(newInfo, userLogin.id);
  }

  const handlePayment = (orderId, orderPrice) =>{
    localStorage.setItem("orderId", orderId);
    localStorage.setItem("totalPrice", (orderPrice/23).toFixed(2));
    history.push('/paypal');
  } 

  const newInfoPassword={
    password:password,
    newPassword:newPassword,
    confirmNewPassword:confirmNewPassword
  }

  const submitHandlerUpdatePassword=(e)=>{
   
    if (password != "" && newPassword != "" && confirmNewPassword !=""){
      e.preventDefault();
      updatePassword(newInfoPassword, userLogin.id);
    }
    
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
      <Layout headerTop="invisible">
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
                            {messageUpdateProfile && messageUpdateProfile? <Message>{messageUpdateProfile}</Message> : ""}
                            {loadingUpdateProfile && loadingUpdateProfile ? <Loader/> :(
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
                            )}
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
                        <form>
                          <div className="myaccount-info-wrapper">
                          {errorUpdatePassword && errorUpdatePassword? <Message variant="danger">{errorUpdatePassword}</Message> : ""}
                          {messageUpdatePassword && messageUpdatePassword? <Message>{messageUpdatePassword}</Message> : ""}
                          {loadingUpdatePassword && loadingUpdatePassword ? <Loader/> :(
                             
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Mật khẩu hiện tại</label>
                                 
                                  <input type="password" 
                                  value={password}
                                  
                                  onChange={(e)=>setPassword(e.target.value)}
                                  required
                                  />
                                  
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Mật khẩu mới</label>
                                  <input type="password" 
                                  value={newPassword}
                                  onChange={(e)=>setNewPassword(e.target.value)}
                                  required/>
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Nhập lại mật khẩu mới</label>
                                  <input type="password" 
                                  value={confirmNewPassword}
                                  onChange={(e)=>setConfirmNewPassword(e.target.value)}
                                  required/>
                                </div>
                              </div>
                            </div>
                            
                            )}
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit" onClick={submitHandlerUpdatePassword}>Thay đổi</button>
                              </div>
                            </div>
                            
                          </div>
                          </form>
                        </Card.Body>
                        
                      </Accordion.Collapse>
                      
                      
                    </Card>

                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            <span>3 .</span> Đơn hàng của tôi
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                        <CardTitle>Danh Sách Orders</CardTitle>
            
                                <Table striped bordered hover responsive className='table-sm mb-0' bordered>
                                <thead>
                                  <tr align="center">
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Thanh toán</th>
                                    <th>Tổng tiền</th>
                                    <th>Thanh toán ?</th>
                                    <th>Thời gian thanh toán</th>
                                    <th>Đã giao ?</th>
                                    <th>Thời gian giao</th>
                                    <th>Thanh toán</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {myOrderList && myOrderList.map((order, key) => {
                                    return(
                                    <tr align="center" >
                                      <th scope="row">{key}</th>
                                      <td >{order.id}</td>
                                      <td>{order.paymentMethod}</td>
                                      <td>{order.totalPrice}</td>
                                      <td>{order.isPaid?<AiFillCheckCircle/>:<AiOutlineCloseCircle/>}</td>
                                      <td>{order.isPaid?order.paidAt.substring(0, 10):""}</td>
                                      <td>{order.isDelivered?<AiFillCheckCircle/>:<AiOutlineCloseCircle/>}</td>
                                      <td>{order.isDelivered?order.deliveredAt.substring(0, 10):""}</td>
                                      <td>
                                          {!order.isPaid?
                                          <Button variant='light' className='btn-sm' onClick={()=>handlePayment(order.id, order.totalPrice)}>
                                              <AiFillEdit/>
                                          </Button>
                                          :
                                          ""}
                                         
  
                                      </td>
                                    </tr>
                                        );
                                      })}
                                  </tbody>
                                </Table>
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
    userLogin: state.loginData.userInfo,
    loadingUpdateProfile: state.userUpdateProfileData.loading,
    messageUpdateProfile: state.userUpdateProfileData.message,
    loadingUpdatePassword: state.userUpdatePasswordData.loading,
    messageUpdatePassword: state.userUpdatePasswordData.message,
    errorUpdatePassword: state.userUpdatePasswordData.error,
    myOrderList: state.myOrderListData.orders
  };
};
const mapDispatchToProps = dispatch => {
  
  return {
    updateProfile: (newInfo, id) => {
      dispatch(updateProfile(newInfo, id));
    },
    updatePassword: (newInfoPassword, userLogin) => {
      dispatch(updatePassword(newInfoPassword, userLogin));
    },
    getMyListOrder: (id)=>{
      dispatch(getMyListOrder(id));
    }
  };
};
MyAccount.propTypes = {
  location: PropTypes.object,
  updateProfile: PropTypes.func,
  userLogin: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
