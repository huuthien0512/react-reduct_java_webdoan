import React, { Fragment, useState, useEffect } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from "prop-types";
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { connect, useDispatch, useSelector } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap'
import { Table } from 'react-bootstrap';
import { getOrderDetails, updateOrder } from '../../../../redux/actions/orderActions'
import { ORDER_UPDATE_RESET } from '../../../../redux/constants/orderConstants'
import Loader from '../../Components/Loader';
import {
  Button, Form,
  FormGroup, Label,
  Input, FormText,
  Row, Col,
  Card, CardBody,
  CardTitle, CustomInput
} from 'reactstrap';

const OrderEditPage = ({ match, userLogin, history, orderInfo, getOrderDetails, updateOrder, successUpdate, loading }) => {
  const orderId = match.params.id;
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState([]);
  const [price, setPrice] = useState('');

  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('');

  const [status, setStatus] = useState('');
  const [updateTime, setUpdateTime] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const [shippingPrice, setShippingPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [isPaid, setIsPaid] = useState('');
  const [paidAt, setPaidAt] = useState('');
  const [isDelivered, setIsDelivered] = useState('');
  const [deliveredAt, setDeliveredAt] = useState('');

  const [note, setNote] = useState('');


  const handleEdit = (e) => {
    e.preventDefault();
    const order={
      status:status,
      idCurrent:userLogin.id
    }
    updateOrder(order, orderId);
  }
  const dispatch = useDispatch();

  useEffect(() => {
    getOrderDetails(orderId);
    if (successUpdate) {
      dispatch({ type: ORDER_UPDATE_RESET })
      alert("Thay đổi thông tin thành công")
      history.push('/orders');
    }
  }, [successUpdate])

  useEffect(() => {
    if (!userLogin) {
      history.push('/');
    }
    if (orderInfo) {
      // setName(orderInfo.name);
      // setQuantity(orderInfo.quantity);
      // setPrice(orderInfo.price);
      // setImage(orderInfo.image);
      setAddress(orderInfo.shippingAddress.address);
      setDistrict(orderInfo.shippingAddress.district);
      setCity(orderInfo.shippingAddress.city);
      setPaymentMethod(orderInfo.paymentMethod);
      setStatus(orderInfo.paymentResult.status);
      setUpdateTime(orderInfo.updateTime);
      setEmailAddress(orderInfo.emailAddress);
      setShippingPrice(orderInfo.shippingPrice);
      setTotalPrice(orderInfo.totalPrice);
      setIsPaid(orderInfo.isPaid);
      setPaidAt(orderInfo.paidAt);
      setIsDelivered(orderInfo.isDelivered);
      setDeliveredAt(orderInfo.deliveredAt);
    }
  }, [orderInfo])
  return (
    <Fragment>
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}>
        <CardTitle>Thông Tin Order</CardTitle>

        {/* Thông tin sản phẩm */}
        <Row>
          <Col lg="12">
            <Card className="main-card mb-3">
              <CardBody>
                <CardTitle>Sản Phẩm</CardTitle>
                {loading ? <Loader /> : (
                  <Table striped bordered hover responsive className='table-sm mb-0' bordered>
                    <thead>
                      <tr align="center">
                        <th>#</th>
                        <th>Tên</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Hình ảnh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderInfo && orderInfo.orderItems.map((item, key) => {
                        return (
                          <tr align="center" >
                            <th scope="row">{key}</th>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td><img src={item.image} width="100" height="50" /></td>
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

        {/* Địa chỉ giao hàng */}
        <Row>
          <Col md="6">
            <Card className="main-card mb-3">
              <CardBody>
                <CardTitle>Địa Chỉ Giao Hàng</CardTitle>
                {loading ? <Loader /> : (
                  <Form>
                    <FormGroup>
                      <Label for="address">Địa chỉ</Label>
                      <Input type="text"
                        name="address"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder=""
                        readOnly/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="district">Quận</Label>
                      <Input type="text"
                        name="district"
                        id="district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder=""
                        readOnly/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="city">Thành Phố</Label>
                      <Input type="text"
                        name="city"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder=""
                        readOnly/>
                    </FormGroup>
                    {/* <Button color="primary" className="mt-1">Submit</Button> */}
                  </Form>
                )}
              </CardBody>
            </Card>
            <Card className="main-card mb-3">
              <CardBody>
                <CardTitle>Theo dõi đơn hàng</CardTitle>
                {loading ? <Loader /> : (
                  <Form>
                    <FormGroup>
                      <Label for="status">Status</Label>
                      <Input type="select" name="status" id="status" value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                        <option>Chưa thanh toán</option>
                        <option>Đã thanh toán</option>
                        <option>Đang giao</option>
                        <option>Đã giao</option>
                        <option>Trục trặc</option>
                      </Input>
                    </FormGroup>
                    <Button color="primary" className="mt-1" onClick={handleEdit}>Thay Đổi</Button>
                  </Form>
                )}
              </CardBody>
            </Card>
          </Col>

          {/* Thông tin thanh toán */}
          <Col md="6">
            <Card className="main-card mb-3">
              <CardBody>
                <CardTitle>Thông Tin Thanh Toán</CardTitle>
                {loading ? <Loader /> : (
                  <Form>
                    <FormGroup>
                      <Label for="paymentMethod">Phương thức thanh toán</Label>
                      <Input type="text"
                        name="paymentMethod"
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        placeholder=""
                        readOnly/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="shippingPrice">Giá Ship</Label>
                      <Input type="text"
                        name="shippingPrice"
                        id="shippingPrice"
                        value={shippingPrice}
                        onChange={(e) => setShippingPrice(e.target.value)}
                        placeholder=""
                        readOnly/>
                    </FormGroup>
                    <FormGroup>
                      <CardTitle>Thanh toán ?</CardTitle>
                      <CustomInput type="checkbox" id = "c1" checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} readOnly/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="paidAt">Thời điểm thanh toán</Label>
                      <Input type="text"
                        name="paidAt"
                        id="paidAt"
                        value={isPaid && paidAt? paidAt.substring(0, 10) + " | " + paidAt.substring(11, 19):""}
                        onChange={(e) => setPaidAt(e.target.value)}
                        placeholder=""
                        readOnly/>
                    </FormGroup>
                    <FormGroup>
                      <CardTitle>Giao hàng ?</CardTitle>
                      <CustomInput type="checkbox" id="c2" checked={isDelivered} onChange={(e) => setIsDelivered(e.target.checked)} readOnly/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="deliveredAt">Thời điểm giao hàng</Label>
                      <Input type="text"
                        name="deliveredAt"
                        id="deliveredAt"
                        value={isDelivered && deliveredAt ? deliveredAt.substring(0, 10) + " | " + deliveredAt.substring(11, 19): ""}
                        onChange={(e) => setDeliveredAt(e.target.value)}
                        placeholder=""
                        readOnly/>
                    </FormGroup>
                  </Form>
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
    orderInfo: state.orderDetailsData.order,
    loading: state.orderUpdateData.loading,
    userLogin: state.loginData.userInfo,
    successUpdate: state.orderUpdateData.success
  };
};
OrderEditPage.propTypes = {
  listUsers: PropTypes.object,
};
const mapDispatchToProps = dispatch => {

  return {
    getOrderDetails: (id) => {
      dispatch(getOrderDetails(id));
    },
    updateOrder: (order, orderId) => {
      dispatch(updateOrder(order, orderId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderEditPage);
