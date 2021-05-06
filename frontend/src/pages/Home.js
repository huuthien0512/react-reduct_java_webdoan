import React, { Fragment, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Layout from "../layouts/Layout";
import HeroSlider from "../wrappers/HeroSlider";
import FeatureIcon from "../wrappers/FeatureIcon";
import TabProduct from "../wrappers/TabProduct";
import BlogFeatured from "../wrappers/BlogFeatured";
import { listProducts } from '../redux/actions/productActions';
import { listBlogs } from '../redux/actions/blogActions';
import { connect } from 'react-redux';

const Home = ({ listProducts, listBlogs }) => {

  useEffect(() => {
    listProducts();
    listBlogs();
  }, [listProducts, listBlogs])

  return (

    <Fragment>

      <MetaTags>
        <title>Cửa Hàng H20</title>
        <meta
          name="description"
          content="Cửa hàng đồ ăn ngon nhất thế giới."
        />
      </MetaTags>
      <Layout
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* hero slider */}
        <HeroSlider />

        {/* featured icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60" category="fashion" />

        {/* blog featured */}
        <BlogFeatured spaceBottomClass="pb-55" />
      </Layout>
    </Fragment>
  );
};
const mapDispatchToProps = dispatch => {

  return {
    listProducts: () => {
      dispatch(listProducts());
    },
    listBlogs: () => {
      dispatch(listBlogs());
    }
  };
}
export default connect(null, mapDispatchToProps)(Home);
