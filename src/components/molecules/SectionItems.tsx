import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { normalizePixelSize } from '@app/utils/normalize';

type Props = {
  title: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const SectionItems = (props: Props) => {
  return (
    <View style={[styles.section, props.style]}>
      <TextComponent size="18" weight="bold">
        {props.title}
      </TextComponent>

      <View style={styles.innerSection}>
        {props.children}
      </View>
    </View>
  );
};

export default SectionItems;

const styles = StyleSheet.create({
  section: {
    gap: normalizePixelSize(20, 'height'),
  },
  innerSection: {
    gap: normalizePixelSize(16, 'height'),
  },
});
