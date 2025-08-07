import { StyleSheet, View } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

type Props = {
  label?: string
};

const CardLabelComponent = (props: Props) => {
  return (
    <View style={styles.container}>
      <TextComponent size="14" color="dark" textAlign="center">
        {props.label ?? ''}
      </TextComponent>
    </View>
  );
};

export default CardLabelComponent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
