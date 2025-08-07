import { StyleSheet, View } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { colors } from '@app/theme';

type Props = {
  label?: string;
  axis?: 'x' | 'y';
}

const DivisorComponent = (props: Props) => {
  if (props.label) {
    return (
      <View style={styles.container}>
        <View style={styles.divisor} />
          <TextComponent size="16" color="dark">
            {props.label}
          </TextComponent>
        <View style={styles.divisor} />
      </View>
    );
  }

  if (props.axis === 'x') {
    return (
      <View style={styles.divisorX} />
    );
  }

  return (
    <View style={styles.divisor} />
  );
};

export default DivisorComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  divisor: {
    width: '100%',
    height: 1,
    backgroundColor: colors.lowlight,
  },
  divisorX: {
    flex: 1,
    width: 10,
    height: '100%',
    backgroundColor: colors.lowlight,
  },
});
