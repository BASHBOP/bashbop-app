import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const Location = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="none" {...props}>
    <Path
      d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
      stroke="currentColor"
      strokeWidth={props.strokeWidth}
    />
    <Path
      d="M12 21C16 17 20 13.4183 20 10C20 6.13401 16.4183 3 12 3C7.58172 3 4 6.13401 4 10C4 13.4183 8 17 12 21Z"
      stroke="currentColor"
      strokeWidth={props.strokeWidth}
    />
  </Svg>
);

export default Location; 