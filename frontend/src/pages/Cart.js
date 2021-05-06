import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getDiscountPrice } from "../helpers/product";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  cartItemStock,
  deleteAllFromCart
} from "../redux/actions/cartActions";
import Layout from "../layouts/Layout";
import Breadcrumb from "../wrappers/Breadcrumb";

const Cart = ({
  location,
  cartItems,
  currency,
  decreaseQuantity,
  addToCart,
  deleteFromCart,
  deleteAllFromCart
}) => {
  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  const { pathname } = location;
  let cartTotalPrice = 0;
  return (
    <Fragment>
      <MetaTags>
        <title>H2O | Giỏ Hàng</title>
        <meta
          name="description"
          content="Cart page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang Chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Giỏ Hàng
      </BreadcrumbsItem>

      <Layout headerTop="invisible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Giỏ hàng của bạn</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Hình Ảnh</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Giá</th>
                            <th>Số Lượng</th>
                            <th>Tổng</th>
                            <th>Hành Động</th>
                          </tr>
                        </thead>
                        <tbody>
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
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.id
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.PUBLIC_URL +
                                        cartItem.image[0]
                                      }
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.id
                                    }
                                  >
                                    {cartItem.name}
                                  </Link>
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {(finalProductPrice * 1000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                      </span>
                                      <span className="amount">
                                        {(finalDiscountedPrice * 1000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {(finalProductPrice * 1000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() =>
                                        decreaseQuantity(cartItem, addToast)
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() =>
                                        addToCart(
                                          cartItem,
                                          addToast,
                                          quantityCount
                                        )
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity &&
                                        cartItem.quantity >=
                                        cartItemStock(
                                          cartItem
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ?
                                    (
                                      (finalDiscountedPrice * cartItem.quantity
                                      ) * 1000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                    :
                                    ((
                                      finalProductPrice * cartItem.quantity
                                    ) * 1000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      deleteFromCart(cartItem, addToast)
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/shop"}
                        >
                          Tiếp Tục Mua Hàng
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => deleteAllFromCart(addToast)}>
                          Xóa Giỏ Hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    {/*<div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Thông Tin Giao Hàng
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Nhập Thông Tin Của Bạn
                        </p>
                        <div className="tax-select-wrapper">
                        <div className="tax-select">
                            <label>* Tên Người Nhận</label>
                              <input type="text" />
                          </div>
                          <div className="tax-select">
                            <label>* Địa Chỉ</label>
                            <input type="text" />
                            {/* <select className="email s-email s-wid">
                              <option>Việt Nam</option>
                              <option>Trung Quốc</option>
                              <option>Nhật Bản</option>
                              <option>Ấn Độ</option>
                              <option>Thái Lan</option>
                            </select> */}
                    {/* </div>
                          <div className="tax-select">
                            <label>* Quận / Huyện</label>
                            <input type="text" /> */}
                    {/* <select className="email s-email s-wid">
                              <option>Quận 1</option>
                              <option>Quận 2</option>
                              <option>Quận 3</option>
                              <option>Quận 4</option>
                              <option>Quận 5</option>
                            </select> *
                          </div>
                          <div className="tax-select">
                            <label>* Thành Phố</label>
                            <input type="text" />
                          </div>
                        </div>
                      </div>
                    </div>*/}
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Mã Giảm Giá
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Nhập mã giảm giá.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Sử Dụng
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Tổng Đơn Hàng
                        </h4>
                      </div>
                      <h5>
                        Tổng Sản Phẩm{" "}
                        <span>
                          {(cartTotalPrice * 1000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Tổng Cộng{" "}
                        <span>
                          {(cartTotalPrice * 1000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                        </span>
                      </h4>

                      <Link to={process.env.PUBLIC_URL + "/checkout"} >
                        Tiến Hành Thanh Toán
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Không có sản phẩm nào trong giỏ hàng của bạn <br />{" "}
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

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: addToast => {
      dispatch(deleteAllFromCart(addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
