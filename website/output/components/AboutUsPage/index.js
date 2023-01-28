import ProfileCard from "../ProfileCard/index.js";
import { ABOUT_US_DATA } from "../../utils/constants.js";
export default function AboutUsPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", {
    id: "aboutUsText"
  }, "About Us:"), /*#__PURE__*/React.createElement("div", null, ABOUT_US_DATA.map((data, index) => /*#__PURE__*/React.createElement(ProfileCard, {
    data: ABOUT_US_DATA[index],
    key: index
  }))));
}