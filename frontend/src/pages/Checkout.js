import PropTypes from "prop-types";
import React, { Fragment, useState  } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../helpers/product";
import Layout from "../layouts/Layout";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import { Button, Form, Row, Col } from 'react-bootstrap';
import { savePayment } from '../redux/actions/cartActions';

const Checkout = ({ location, cartItems, currency, savePayment}) => {
  const { pathname } = location;
  let cartTotalPrice = 0;
  //const [payment, setPayment] = useState('Paypal');

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Thanh Toán</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang Chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Thanh Toán
      </BreadcrumbsItem>
      <Layout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Thông Tin Thanh Toán</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Họ Và Tên Đệm</label>
                          <input type="text" required />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Tên</label>
                          <input type="text" required/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email</label>
                          <input type="text" required/>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Địa Chỉ</label>
                          <input type="text" required/>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Quận / Huyện</label>
                          <input type="text" required/>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Thành Phố</label>
                          <input type="text" required/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Số Điện Thoại</label>
                          <input type="text" required/>
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
                                      ? (
                                        finalDiscountedPrice *
                                        cartItem.quantity
                                      ).toFixed(2)*1000 + " " + currency.currencySymbol
                                        
                                      : (
                                        finalProductPrice * cartItem.quantity
                                      ).toFixed(2)*1000 + " " + currency.currencySymbol
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
                              {cartTotalPrice.toFixed(2)*1000 + " " + currency.currencySymbol
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
                          //onChange={/*(e) => setPayment(e.target.value)*/}
                        ></Form.Check>
                      </Col>
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
                      <button className="btn-hover">Đặt Hàng</button>
                    </div>
                  </div>
                </div>
              </div>
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
    currency: state.currencyData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    savePayment: (payment) => {
      dispatch(savePayment(payment));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
