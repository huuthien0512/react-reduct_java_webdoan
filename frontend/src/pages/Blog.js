import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Layout from "../layouts/Layout";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../wrappers/blog/BlogSidebar";
import BlogPagination from "../wrappers/blog/BlogPagination";
import BlogPosts from "../wrappers/blog/BlogPosts";
import { connect } from 'react-redux';
import { getSortedBlogs } from '../helpers/blog';

const Blog = ({ location, blogs }) => {
  const { pathname } = location;
  const [sortType, setSortType] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [currentData, setCurrentData] = useState([]);
  const [filterSortType, setFilterSortType] = useState('');
  const [filterSortValue, setFilterSortValue] = useState('');
  const [offset, setOffset] = useState(0);
  const [sortedBlogs, setSortedBlogs] = useState([]);
  const pageLimit = 15;
  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  }
  useEffect(() => {
    let sortedBlogs = getSortedBlogs(blogs, sortType, sortValue);
    const filterSortedBlogs = getSortedBlogs(sortedBlogs, filterSortType, filterSortValue);
    sortedBlogs = filterSortedBlogs;
    setSortedBlogs(sortedBlogs);
    setCurrentData(sortedBlogs.slice(offset, offset + pageLimit));
  }, [offset, blogs, sortType, sortValue, filterSortType, filterSortValue ]);
  return (
    <Fragment>
      <MetaTags>
        <title>H20 | Blog</title>
        <meta
          name="description"
          content="Blog of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang Chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Blog
      </BreadcrumbsItem>
      <Layout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-lg-9">
                <div className="ml-20">
                  <div className="row">
                    {/* blog posts */}
                    <BlogPosts blogs={currentData}/>
                  </div>

                  {/* blog pagination */}
                  <BlogPagination />
                </div>
              </div>
              <div className="col-lg-3">
                {/* blog sidebar */}
                <BlogSidebar blogs={blogs} getSortParams={getSortParams} sideSpaceClass="mr-30"/>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

Blog.propTypes = {
  location: PropTypes.object
};
const mapStateToProps = (state) => {
  return {
    blogs: state.blogData.blogs,
  };
};

export default connect(mapStateToProps)(Blog);
