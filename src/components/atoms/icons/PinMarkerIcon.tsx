import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { View } from 'react-native';

export interface PinMarkerIconProps extends SvgProps {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
}

const PinMarkerIcon = ({
  size = 24,
  fillColor = '#A5E0EA',
  strokeColor = '#fff',
  ...props
}: PinMarkerIconProps) => {
  const viewBox = '0 0 48 48';

  return (
    <View>
      <Svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        {...props}
      >
        <Path
          fill={fillColor}
          stroke={strokeColor}
          d="m32.666 31.12.002-.002a17.914 17.914 0 1 0-25.336 0c.593.593 1.33 1.321 2.21 2.183l.001.002 6.98 6.792h.001a5 5 0 0 0 6.951 0c2.793-2.698 5.065-4.907 6.815-6.626l.002-.001 2.373-2.348Z"
        />
      </Svg>
    </View>
  );
};

export default PinMarkerIcon;
