import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const BlogSidebar = ( categories) => {
  console.log(categories)
  return (
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
      <div className="sidebar-widget mt-35">
        <h4 className="pro-sidebar-title">Categories</h4>
        <div className="sidebar-widget-list sidebar-widget-list--blog mt-20">
          <ul>
          {/* {categories.map((category) => {
            return (
            <li >
              <div className="sidebar-widget-list-left">
              <button
                      // onClick={e => {
                      //   getSortParams("category", category);
                      //  // setActiveSort(e);
                      // }}
                    >
                      {" "}
                      <span className="checkmark" /> {category}{" "}
                    </button> */}
                <input type="checkbox" defaultValue />{" "}
                <Link to={process.env.PUBLIC_URL + "/blo"}>
                  Women <span>4</span>{" "}
                </Link>
                <span className="checkmark" />
              {/* </div>
            </li>
            );
            })} */}
          </ul>
        </div>
      </div>
    </div>
  );
};
BlogSidebar.propTypes = {
  categories: PropTypes.array
};
const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.blogData.blogs.category
  };
};
export default connect(mapStateToProps)(BlogSidebar);
