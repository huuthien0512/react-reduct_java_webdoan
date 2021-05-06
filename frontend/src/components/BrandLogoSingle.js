import PropTypes from "prop-types";
import React from "react";

const BrandLogoSingle = ({ data, sliderClassName, spaceBottomClass }) => {
  return (
    <div
      className={`single-brand-logo ${sliderClassName ? sliderClassName : ""} ${spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <img src={process.env.PUBLIC_URL + data.image} alt="" />
    </div>
  );
};

BrandLogoSingle.propTypes = {
  data: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default BrandLogoSingle;
