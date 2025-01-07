import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const Ticket = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="none" {...props}>
    <Path
      d="M8 7V5M8 19V17M12 7V5M12 19V17M16 7V5M16 19V17M3 9H21M3 15H21M4 5H20V19H4V5Z"
      stroke="currentColor"
      strokeWidth={props.strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);

export default Ticket; 