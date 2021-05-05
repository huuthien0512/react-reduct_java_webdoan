import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Layout from "../layouts/Layout";
import Breadcrumb from "../wrappers/Breadcrumb";
import BlogSidebar from "../wrappers/BlogSidebar";
import BlogPagination from "../wrappers/BlogPagination";
import BlogPosts from "../wrappers/BlogPosts";
import { connect } from 'react-redux';
import { getSortedBlogs } from '../helpers/blog';
import {listBlogs} from '../redux/actions/blogActions';

const Blog = ({ location, blogs, listBlogs }) => {

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

  useEffect(()=>{
    listBlogs();
  },[])

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
      <Layout headerTop="invisible">
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
const mapDispatchToProps = dispatch => {
  
  return {
      listBlogs: () => {
      dispatch(listBlogs());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Blog);
