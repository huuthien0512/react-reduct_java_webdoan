import PropTypes from "prop-types";
import React, { useEffect }  from "react";
import { connect } from 'react-redux';

import BlogFeaturedSingle from "../components/BlogFeaturedSingle";
import SectionTitle from "../components/SectionTitle";

const BlogFeatured = ({ blogs, spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`blog-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <SectionTitle
          titleText="BLOG"
          positionClass="text-center"
          spaceClass="mb-55"
        />
        <div className="row">
          {blogs.slice(0, 3).map(singlePost => {
            return (
              <BlogFeaturedSingle singlePost={singlePost} key={singlePost.id} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

BlogFeatured.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogData.blogs,
  };
};
export default connect(mapStateToProps)(BlogFeatured);
