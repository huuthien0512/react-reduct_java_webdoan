import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { searchProducts } from '../../redux/actions/productActions'
import PropTypes from "prop-types";
const ShopSearch = ({ getSearchProducts, searchedProducts, searchProducts, products }) => {
  const [searchString, setSearchString] = useState('');
  useEffect(() => {
    if (searchedProducts) {
      getSearchProducts(searchedProducts);
    }
  }, [searchedProducts, getSearchProducts])

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Tìm Kiếm </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" action="#">
          <input type="text" placeholder="Nhập tìm kiếm ở đây..." value={searchString} onChange={(e) => setSearchString(e.target.value)} />
          <button onClick={(e) => {
            e.preventDefault();
            searchProducts(searchString);
          }}>
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
  );
};
ShopSearch.propTypes = {
  searchProducts: PropTypes.func,
  setSearchProducts: PropTypes.func
};
const mapStateToProps = state => {
  return {
    searchedProducts: state.searchedProductData.products,
    products: state.productData.products
  };
};
const mapDispatchToProps = dispatch => {
  return {
    searchProducts: (searchString) => {
      dispatch(searchProducts(searchString));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShopSearch);
