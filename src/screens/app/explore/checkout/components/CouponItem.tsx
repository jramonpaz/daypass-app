import { Image, StyleSheet, View } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { dismiss_circle_icon, tag_check_icon } from '@app/utils/images';
import { colors } from '@app/theme';
import { normalizePixelSize } from '@app/utils/normalize';

const CouponItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={tag_check_icon} style={styles.icon} />
        <View>
          <TextComponent size="14" color="dark" weight="bold">Cupón aplicado</TextComponent>
          <TextComponent size="12" color="muted">Ahorraste $49.09</TextComponent>
        </View>
      </View>
      <Image source={dismiss_circle_icon} style={styles.icon} />
    </View>
  );
};

export default CouponItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.light,
    borderRadius: normalizePixelSize(16, 'height'),
    height: 44,
    paddingHorizontal: 20,
    // padding: 10,
    // borderBottomWidth: 1,
    // borderColor: '#E6E6E6',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detail: {},
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.primary,
  },
});
