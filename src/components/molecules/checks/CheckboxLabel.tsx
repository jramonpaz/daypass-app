import { StyleSheet, View } from 'react-native';
import React from 'react';

import CheckboxComponent from './CheckboxComponent';
import TextComponent, { TextComponentColors } from '../../atoms/text/TextComponent';

type Props = {
  active?: boolean;
  onChange?: (value: boolean) => void;
  label?: string;
  labelColor?: TextComponentColors;
};

const CheckboxLabel = (props: Props) => {
  return (
    <View style={styles.contend}>
      <CheckboxComponent isActive={props.active} onChange={props.onChange} />
      <TextComponent size="14" color={props.labelColor ?? 'dark'} >{props.label ?? ''}</TextComponent>
    </View>
  );
};

export default CheckboxLabel;

const styles = StyleSheet.create({
  contend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
