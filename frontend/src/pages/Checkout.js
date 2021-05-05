import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../helpers/product";
import Layout from "../layouts/Layout";
import Breadcrumb from "../wrappers/Breadcrumb";
import { Button, Form, Row, Col } from 'react-bootstrap';
import { savePayment } from '../redux/actions/cartActions';
import { createOrder, getListOrder } from "../redux/actions/orderActions";
import Message from '../components/Message';

const Checkout = ({ location, cartItems, currency, history, cartData, createOrder, userLogin, orderInfo}) => {
  const { pathname } = location;
  let cartTotalPrice = 0;
  const [payment, setPayment] = useState('PayPal');

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [telephone, setTelephone] = useState('');
  const [note, setNote] = useState('');
  
  const [errorFirstname, setErrorFirstname]= useState('');
  const [errorLastname, setErrorLastname]= useState('');
  const [errorEmail, setErrorEmail]= useState('');
  const [errorAddress, setErrorAddress]= useState('');
  const [errorCity, setErrorCity]= useState('');
  const [errorTelephone, setErrorTelephone]= useState('');

  const [status, setStatus]= useState("Chưa thanh toán");

  useEffect(() => {
    if (!userLogin) {
      history.push('/login-register');
    }
  }, [userLogin, history]);

  var i, total = 0;
  for(i=0; i < cartData.length; i++){
    var t = cartData[i].price*cartData[i].quantity;
    total += (t-(t*cartData[i].discount/100));
  }
  var tt = total;
  total = (total/23).toFixed(2);

  useEffect(() => {
    setPayment(payment);
  }, [payment]);

  localStorage.setItem('totalPrice', total)
  const clickHandle= (e) =>{
      const shippingAddress={
        address:address,
        district:district,
        city:city,
        firstname:firstname,
        lastname:lastname,
        email:email,
        telephone:telephone
      }
      const paymentResult={
        status:status
      }
      const order={
        orderItems:cartData.map(cart =>{
        const container = {};
        container.name = cart.name;
        container.quantity = cart.quantity;
        container.image = cart.image;
        container.price = cart.price;
        return container;
        }),
        shippingPrice:0,
        paymentMethod:payment,
        paymentResult:paymentResult,
        totalPrice:tt,
        shippingAddress:shippingAddress,
        userId:userLogin.id,
        note:note
      }
      if (firstname != "" && lastname != "" && email!="" && address!="" && district!="" && city!="" && telephone!=""){
        createOrder(order);
       
        if(payment=="PayPal"){
          history.push('/paypal')
          
        }else{
          history.push('/')
        }
      }

  }
  return (
    <Fragment>
      <MetaTags>
        <title>H2O | Thanh Toán</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang Chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Thanh Toán
      </BreadcrumbsItem>
      <Layout headerTop="invisible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
               <form>
              <div className="row">
               
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Thông Tin Thanh Toán</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Họ Và Tên Đệm</label>
                          <input type="text"
                          value={firstname}
                          onChange={(e)=>setFirstname(e.target.value)}
                          required/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Tên</label>
                          {errorLastname && <Message variant="danger">{errorLastname}</Message>}
                          <input type="text"
                          value={lastname}
                          onChange={(e)=>setLastname(e.target.value)}
                          required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email</label>
                          <input type="email"
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                          required/>
                        </div>
                      </div>
                      
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Địa Chỉ</label>
                          <input type="text"
                          value={address}
                          onChange={(e)=>setAddress(e.target.value)}
                          required/>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Quận / Huyện</label>
                          <input type="text"
                          value={district}
                          onChange={(e)=>setDistrict(e.target.value)}
                          required/>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Thành Phố</label>
                          <input type="text"
                          value={city}
                          onChange={(e)=>setCity(e.target.value)}
                          required/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Số Điện Thoại</label>
                          <input type="text"
                          value={telephone}
                          onChange={(e)=>setTelephone(e.target.value)}
                          required/>
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Thông Tin Thêm</h4>
                      <div className="additional-info">
                        <label>Ghi Chú</label>
                        <textarea
                          placeholder="Lời nhắn mong muốn"
                          name="message"
                          defaultValue={""}
                          value={note}
                          onChange={(e)=>setNote(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Đơn đặt hàng của bạn</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Sản Phẩm</li>
                            <li>Tổng Cộng</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? ((
                                        finalDiscountedPrice *
                                        cartItem.quantity
                                      )*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
                                        
                                      : ((
                                        finalProductPrice * cartItem.quantity
                                      )*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
                                        }
                                   
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Miễn Phí Ship</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Tổng</li>
                            <li>
                              {(cartTotalPrice*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
                                }
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method">
                      <Form.Group>
                      <Form.Label>Chọn phương thức</Form.Label>
                      <Col>
                        <Form.Check
                          type='radio'
                          label='PayPal'
                          id='PayPal'
                          name='payment'
                          value='PayPal'
                          checked
                         onChange={(e) => setPayment(e.target.value)}
                        ></Form.Check>
                      </Col>
                      <br></br>
                      {/* <Col>
                        <Form.Check
                          type='radio'
                          label='Card'
                          id='Card'
                          name='payment'
                          value='Card'
                          //onChange={/*(e) => setPayment(e.target.value)}
                        ></Form.Check>
                      </Col> */}
                    </Form.Group>
                      </div>
                    </div>
                    <div className="place-order mt-25">
                      <button className="btn-hover" onClick={clickHandle}>Đặt Hàng</button>
                    </div>
                  </div>
                </div>
              </div>
              </form>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Không Có Sản Phẩm Trong Giỏ Hàng Để Thanh Toán <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>
                        Mua Ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
    cartData: state.cartData,
    userLogin: state.loginData.userInfo,
    orderInfo: state.orderCurrent.order
  };
};
const mapDispatchToProps = dispatch => {
  return {
    savePayment: (payment) => {
      dispatch(savePayment(payment));
    },
    createOrder: (order) => {
      dispatch(createOrder(order));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
