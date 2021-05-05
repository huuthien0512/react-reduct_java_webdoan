import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Layout from "../layouts/Layout";
import Breadcrumb from "../wrappers/Breadcrumb";
import SectionTitleWithText from "../components/SectionTitleWithText";
import Banner from "../wrappers/Banner";
import TextGrid from "../wrappers/TextGrid";
import FunFact from "../wrappers/FunFact";
import TeamMember from "../wrappers/TeamMember";
import BrandLogoSlider from "../wrappers/BrandLogoSlider";

const About = ({ location }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>H2O | Về Chúng Tôi</title>
        <meta
          name="description"
          content="About page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang Chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Về Chúng Tôi
      </BreadcrumbsItem>
      <Layout headerTop="invisible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* section title with text */}
        <SectionTitleWithText spaceTopClass="pt-100" spaceBottomClass="pb-95" />

        {/* banner */}
        <Banner spaceBottomClass="pb-70" />

        {/* text grid */}
        <TextGrid spaceBottomClass="pb-70" />

        {/* fun fact */}
        <FunFact
          spaceTopClass="pt-100"
          spaceBottomClass="pb-70"
          bgClass="bg-gray-3"
        />

        {/* team member */}
        <TeamMember spaceTopClass="pt-95" spaceBottomClass="pb-70" />

        {/* brand logo slider */}
        <BrandLogoSlider spaceBottomClass="pb-70" />
      </Layout>
    </Fragment>
  );
};

About.propTypes = {
  location: PropTypes.object
};

export default About;
