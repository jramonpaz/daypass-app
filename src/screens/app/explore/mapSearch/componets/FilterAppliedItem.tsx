import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { normalizePixelSize } from '@app/utils/normalize';

import { colors } from '@app/theme';
import { x_close_icon } from '@app/utils/images';

type Props = {
  title: string;
  onPress?: () => void;
};

const FilterAppliedItem = (props: Props) => {
  return (
    <View style={styles.container}>
      <TextComponent size="12" color="primary">
        {props.title}
      </TextComponent>

      <Pressable onPress={props.onPress}>
        <Image source={x_close_icon} style={styles.closeIcon}/>
      </Pressable>
    </View>
  );
};

export default FilterAppliedItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: normalizePixelSize(6, 'width'),
    paddingVertical: normalizePixelSize(6, 'height'),
    paddingHorizontal: normalizePixelSize(12, 'width'),
    backgroundColor: colors.light,
    borderRadius: normalizePixelSize(14, 'height'),
    borderWidth: 0.5,
    borderColor: colors.primary,
    flexShrink: 1,
    flexGrow: 1,
  },
  closeIcon: {
    width: normalizePixelSize(14, 'width'),
    height: normalizePixelSize(14, 'width'),
    tintColor: colors.primary,
  },
});
