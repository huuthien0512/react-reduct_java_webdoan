import React, {Fragment,useState, useEffect } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import PropTypes from "prop-types";
import { Button, Table } from 'react-bootstrap';
import { connect, useDispatch , useSelector} from "react-redux";
import {AiFillCheckCircle,AiOutlineCloseCircle,AiFillEdit,AiOutlineDelete} from 'react-icons/ai'
import {LinkContainer} from 'react-router-bootstrap'
import {listOrders} from '../../../../redux/actions/orderActions'
import Loader from '../../Components/Loader';

const OrdersTable = ({ listOrdersInfo, successDelete, successUpdate, deleteUser, loading, userLogin, history, listOrders }) => {
  const dispatch=useDispatch();
  // const handleDelete=async(id)=>{
  //   deleteOrder(id);
  // }

  
  useEffect(()=>{
    listOrders();
    // if(successDelete) {
    //   dispatch({type:USER_DELETE_RESET})
    // }
    if(!userLogin){
      history.push('/');
    }
    
  },[successUpdate])
  
    return (
        <Fragment>
            <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
                <Row>
                    <Col lg="12">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>Danh Sách Orders</CardTitle>
                                {loading?<Loader/>:(
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
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {listOrdersInfo && listOrdersInfo.map((order, key) => {
                                    const {address, district, city} = order.shippingAddress;
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
                                      <LinkContainer to={`order/edit/${order.id}`}>
                                          <Button variant='light' className='btn-sm'>
                                              <AiFillEdit/>
                                          </Button>
                                          </LinkContainer>
                                        {/* &nbsp;&nbsp;&nbsp;
                                        <Button variant='danger' className='btn-sm' onClick={()=>handleDelete(order.id)}>
                                              <AiOutlineDelete/>
                                          </Button> */}
                                      </td>
                                    </tr>
                                      );
                                    })}
                                </tbody>
                              </Table>
                                )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </ReactCSSTransitionGroup>
        </Fragment>
    );
};

const mapStateToProps = state => {
  return {
    successDelete: state.userDeleteData.success,
    loading: state.orderListAllData.loading,
    userLogin: state.loginData.userInfo,
    listOrdersInfo: state.orderListAllData.orders,
    successUpdate: state.userAdminUpdateData.success
  };
};
OrdersTable.propTypes = {
  listUsers: PropTypes.object,
};
const mapDispatchToProps = dispatch => {
  
  return {
    // deleteUser: (id) => {
    //   dispatch(deleteUser(id));
    // },
    listOrders: () => {
      dispatch(listOrders());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable);
