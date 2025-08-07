import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { normalizePixelSize } from '@app/utils/normalize';
import { colors } from '@app/theme';

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showMargin?: boolean;
  showMarginH?: boolean;
};

const BottomContainer = (props: Props) => {
  return (
    <View style={[
        styles.bottomContainer,
        props.showMargin && styles.margin,
        props.showMarginH && styles.marginH,
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
};

export default BottomContainer;

const styles = StyleSheet.create({
  bottomContainer: {
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    // alignSelf: 'center',
    // backgroundColor: colors.red,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: normalizePixelSize(12, 'width'),
    paddingHorizontal: normalizePixelSize(20, 'width'),
    paddingTop: normalizePixelSize(4, 'height'),
    paddingBottom: normalizePixelSize(Platform.OS === 'ios' ? 32 : 20, 'height'),
  },
  margin: {
    borderTopWidth: 1,
    borderTopColor: colors.lowlight,
  },
  marginH: {
    paddingHorizontal: normalizePixelSize(20, 'width'),
  },
});
