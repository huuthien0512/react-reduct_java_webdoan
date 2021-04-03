import React, {useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getIndividualCategories
} from "../../helpers/blog";
import { setActiveSort } from "../../helpers/blog";
import ShopCategories from "../../components/product/ShopCategories";

const BlogSidebar = ( {blogs, getSortParams, sideSpaceClass}) => {
  const uniqueCategories = getIndividualCategories(blogs);
  console.log(uniqueCategories)
  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
    <div className="sidebar-style">
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">Tìm Kiếm </h4>
        <div className="pro-sidebar-search mb-55 mt-25">
          <form className="pro-sidebar-search-form" action="#">
            <input type="text" placeholder="Nhập tìm kiếm ở đây..." />
            <button>
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      {/* filter by categories */}
      <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParams}
      />
    </div>
    </div>
  );
};
BlogSidebar.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func
};
const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.blogData.blogs.category,
    blogs: state.blogData.blogs
  };
};
export default connect(mapStateToProps)(BlogSidebar);
