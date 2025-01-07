import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const Calendar = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="none" {...props}>
    <Path
      d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18"
      stroke="currentColor"
      strokeWidth={props.strokeWidth}
      strokeLinecap="round"
    />
    <Path
      d="M21 5H3V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5Z"
      stroke="currentColor"
      strokeWidth={props.strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);

export default Calendar; 