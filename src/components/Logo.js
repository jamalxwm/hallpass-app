import * as React from 'react';
import Svg, { Path, Rect, Line } from 'react-native-svg';

const Logo = (props) => (
  <Svg
    width={85}
    height={91}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M0 2.34184e-06V91H19.1237V17.8671H40V2.34184e-06H0Z"
      fill="#524FFC"
    />
    <Path d="M85 2.34184e-06V91H65.8763V17.8671H45V2.34184e-06H85Z" fill="#524FFC" />
    <Rect x="31" y="32" width="23" height="43" fill="#524FFC" />
    <Line x1="18.3972" y1="16.6963" x2="31.3972" y2="33.6963" stroke="#524FFC" />
    <Line y1="-0.5" x2="21.4009" y2="-0.5" transform="matrix(0.60745 -0.794358 -0.794358 -0.60745 18 91)" stroke="#524FFC"/>
    <Line y1="-0.5" x2="21.4009" y2="-0.5" transform="matrix(-0.60745 0.794358 0.794358 0.60745 67 17)" stroke="#524FFC"/>
    <Line x1="66.6028" y1="91.3037" x2="53.6028" y2="74.3037" stroke="#524FFC"/>
  </Svg>
);

export default Logo;
