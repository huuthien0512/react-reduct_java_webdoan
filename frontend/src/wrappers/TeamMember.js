import PropTypes from "prop-types";
import React from "react";
import SectionTitleTwo from "../components/SectionTitleTwo";
import teamMemberData from "../data/team-member.json";
import TeamMemberSingle from "../components/TeamMemberSingle";

const TeamMember = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`team-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        {/* section title */}
        <SectionTitleTwo
          titleText="Thành Viên Trong Nhóm"
          subTitleText="Những người đã tham gia sáng lập cửa hàng."
          positionClass="text-center"
          spaceClass="mb-60"
        />

        <div className="row">
          {teamMemberData &&
            teamMemberData.map((single, key) => {
              return (
                <TeamMemberSingle
                  data={single}
                  spaceBottomClass="mb-30"
                  key={key}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

TeamMember.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default TeamMember;
