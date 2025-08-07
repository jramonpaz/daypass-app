import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';
import { normalizePixelSize } from '@app/utils/normalize';
import { colors } from '@app/theme';

type Props = {
  imageSource: ImageSourcePropType;
  title: string;
  description: string;
};

const NotificationItem = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContent}>
        <Image style={styles.image} source={props.imageSource} />
      </View>
      <View style={styles.content}>
        <TextComponent size="14" weight="bold">{props.title}</TextComponent>
        <TextComponent size="12" color="muted">{props.description}</TextComponent>
      </View>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: normalizePixelSize(12),
    height: normalizePixelSize(64, 'height'),
  },
  content: {
    flexShrink: 1,
    justifyContent: 'space-between',
    gap: normalizePixelSize(8, 'height'),
  },
  imageContent: {
    // marginTop: 4,
    width: normalizePixelSize(44, 'height'),
    height: normalizePixelSize(44, 'height'),
    backgroundColor: colors.blueSecondary,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: normalizePixelSize(20, 'height'),
    height: normalizePixelSize(20, 'height'),
    // borderRadius: normalizePixelSize(21),
    resizeMode: 'cover',
  },
});
