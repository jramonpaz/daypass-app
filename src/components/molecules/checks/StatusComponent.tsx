import { Image, StyleSheet,  View } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { normalizePixelSize } from '@app/utils/normalize';
import { checkmark_circle_icon, hourglass_icon } from '@app/utils/images';

import { colors } from '@app/theme';

type Props = {
  label?: string;
  type: 'success' |'pending' | 'abort';
}

const StatusComponent = (props: Props) => {
  if (props.type === 'abort') {
    return (
      <View style={[styles.container, styles.abortType]}>
        <Image source={hourglass_icon} style={[styles.icon, styles.abortIcon]} />
        {props.label && (
          <TextComponent color="yellow" size="12">
            {props.label}
          </TextComponent>
        )}
      </View>
    );
  }

  if (props.type === 'pending') {
    return (
      <View style={[styles.container, styles.pendingType]}>
        <Image source={hourglass_icon} style={[styles.icon, styles.pendingIcon]} />
        {props.label && (
          <TextComponent color="muted" size="12">
            {props.label}
          </TextComponent>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={checkmark_circle_icon} style={styles.icon} />
      {props.label && (
        <TextComponent color="green" size="12">
          {props.label}
        </TextComponent>
      )}
    </View>
  );
};

export default StatusComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    gap: 4,
    height: normalizePixelSize(24, 'height'),
    borderRadius: 4,
    backgroundColor: colors.green_800_a50,
    borderWidth: 1,
    borderColor: colors.green,
    paddingHorizontal: normalizePixelSize(8, 'width'),
    // paddingVertical: normalizePixelSize(4, 'height'),
    marginTop: normalizePixelSize(8, 'height'),
  },
  icon: {
    width: normalizePixelSize(16, 'height'),
    height: normalizePixelSize(16, 'height'),
    resizeMode: 'contain',
    tintColor: colors.green,
  },
  pendingType: {
    borderWidth: 1,
    borderColor: colors.muted,
    backgroundColor: colors.light,
  },
  pendingIcon: {
    tintColor: colors.muted,
  },
  abortType: {
    borderWidth: 1,
    borderColor: colors.yellow,
    backgroundColor: colors.yellow_200,
  },
  abortIcon: {
    tintColor: colors.yellow,
  },
});
