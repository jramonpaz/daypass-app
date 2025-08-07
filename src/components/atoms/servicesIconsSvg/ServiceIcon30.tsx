import * as React from 'react';
import Svg, { SvgProps, Defs, Path, ClipPath, G } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

export const ServiceIcon30 = (props: SvgProps) => (
  <Svg
    id="Capa_1"
    data-name="Capa 1"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    {...props}
  >
    <Defs>
      <ClipPath id="clippath">
        <Path
          d="M0 0h24v24H0z"
          fill= "none"
        />
      </ClipPath>
    </Defs>
    <G
      clipPath= "url(#clippath)"
    >
      <Path
        d="M20.31 14.94c-.08 0-.17-.01-.25-.04L.67 8.23c-.31-.11-.52-.4-.52-.72s.21-.62.52-.72L20.06.12c.23-.08.49-.04.69.1.2.14.32.38.32.62v13.33c0 .25-.12.48-.32.62-.13.09-.29.14-.44.14ZM3.27 7.51l16.28 5.59V1.92L3.27 7.51Z"
      />
      <Path
        d="M23.16 23.88h-2.85a.76.76 0 0 1-.76-.76V.85c0-.42.34-.76.76-.76h2.85c.42 0 .76.34.76.76v22.27c0 .42-.34.76-.76.76Zm-2.08-1.53h1.32V1.61h-1.32v20.74ZM13.52 23.64c-2.69 0-4.88-2.21-4.88-4.92s2.19-4.92 4.88-4.92 4.88 2.21 4.88 4.92-2.19 4.92-4.88 4.92Zm0-8.32c-1.85 0-3.35 1.52-3.35 3.39s1.5 3.39 3.35 3.39 3.35-1.52 3.35-3.39-1.5-3.39-3.35-3.39Z"
      />
    </G>
  </Svg>
);
