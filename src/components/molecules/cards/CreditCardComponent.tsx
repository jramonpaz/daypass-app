import { Image, StyleSheet, View } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { normalizePixelSize } from '@app/utils/normalize';

import { visa_icon } from '@app/utils/images';
import { colors } from '@app/theme';

type Props = {
  type: 'visa';
  lastnumbers: string;
}

const CreditCardComponent = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {props.type === 'visa' && (
          <Image source={visa_icon} style={styles.cardIcon} resizeMethod="resize" />
        )}
      </View>
      <TextComponent size="16" color="dark">{`••••${props.lastnumbers}`}</TextComponent>
    </View>
  );
};

export default CreditCardComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 16,
    justifyContent: 'flex-start',
    // paddingVertical: 8,
    gap: 12,
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.lowlight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    height: normalizePixelSize(34, 'height'),
    width: normalizePixelSize(52, 'width'),
  },
  cardIcon: {
    height: normalizePixelSize(12, 'height'),
    // flexGrow: 1,
    // flexShrink: 1,
    resizeMode: 'contain',
    // marginHorizontal: 8,
    // marginVertical: 4,
    // backgroundColor: 'blue',
  },
});
