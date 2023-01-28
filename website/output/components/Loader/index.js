import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { CSS_OVERRIDE_FOR_LOADER_COMPONENT } from "./../../utils/constants.js";
export default function Loader({
  loading
}) {
  let [size, setSize] = React.useState(22.5);
  let [color, setColor] = React.useState("#FFFFFF");
  let [cssOverride, setCssOverride] = React.useState(CSS_OVERRIDE_FOR_LOADER_COMPONENT);
  let [speedMultiplier, setSpeedMultiplier] = React.useState(1.5);
  return /*#__PURE__*/React.createElement("div", {
    className: "loader-wrapper"
  }, /*#__PURE__*/React.createElement(ClimbingBoxLoader, {
    size: size,
    color: color,
    loading: loading,
    cssOverride: cssOverride,
    speedMultiplier: speedMultiplier,
    "aria-label": "Loading Spinner",
    "data-testid": "loader-component"
  }));
}