import PropTypes from "prop-types";
import React from "react";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Chúng Tôi Là Ai</h5>
          <h1>Chào Mừng Đến Cửa Hàng Cơm Sườn H2O</h1>
          <p>
            Ra đời được 20 năm, cơm tấm H2O là một trong những tiệm cơm tấm đắt khách và sang nhất Sài Gòn. Thoạt nhìn, tiệm chỉ là một ngôi nhà nằm ngay Xa Lộ Hà Nội, rất bình thường nhưng chất lượng thì không thể nào so sánh được với bất kì một tiệm cơm tấm nào khác ở Sài Gòn. Món cơm tấm sườn chả có lẽ là món được yêu thích nhất ở đây, đảm bảo bạn sẽ không đi đâu mà tìm được món chả được làm theo công thức độc quyền của quán, sườn thì được ướp rất ngon, vừa ăn, nướng không hề bị cháy, cơm tấm thì không chê vào đâu được. Cơm tấm được ăn kèm theo món dưa chua tự làm cũng cực kì ngon.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
