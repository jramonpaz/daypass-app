import { StyleSheet, View } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { colors } from '@app/theme';
import { normalizePixelSize } from '@app/utils/normalize';

type Props = {
  mood: string;
}

const MoodButton = (props: Props) => {
  return (
    <View style={styles.container}>
      <TextComponent size="12" color="dark">{props.mood}</TextComponent>
    </View>
  );
};

export default MoodButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: colors.lowlight,
    backgroundColor: colors.light,
    borderRadius: 4,
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalizePixelSize(8, 'width'),
    paddingVertical: normalizePixelSize(4, 'height'),
    gap: 4,
  },
});
