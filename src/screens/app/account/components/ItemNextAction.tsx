import { Image, ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { normalizePixelSize } from '@app/utils/normalize';
import TextComponent from '@app/components/atoms/text/TextComponent';
import { chevron_right } from '@app/utils/images';
import { colors } from '@app/theme';

type Props = {
  iconSource: ImageSourcePropType;
  label: string;
  onPress?: () => void;
};

const ItemNextAction = (props: Props) => {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <View style={styles.leftContent}>
        <Image source={props.iconSource} style={styles.icon} />
        <TextComponent size="16" color="dark" >{props.label}</TextComponent>
      </View>
      <Image source={chevron_right} style={styles.icon} />
    </Pressable>
  );
};

export default ItemNextAction;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    height: normalizePixelSize(36, 'height'),
    borderBottomWidth: 1,
    // marginBottom: 2,
    borderBottomColor: colors.lowlight,
  },
  icon: {
    width: normalizePixelSize(20, 'height'),
    height: normalizePixelSize(20, 'height'),
    tintColor: 'dark',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: normalizePixelSize(16),
  },
});
