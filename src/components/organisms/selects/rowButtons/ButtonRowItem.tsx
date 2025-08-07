import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { colors } from '@app/theme';

type Props = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  isActive?: boolean;
}

const ButtonRowItem = (props: Props) => {
  return (
    <Pressable
      style={[
        styles.button,
        props.isActive && styles.button_active,
        props.style,
      ]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <TextComponent size="12" color={props.isActive ? 'primary' : 'dark'}>
        {props.label}
      </TextComponent>
    </Pressable>
  );
};

export default ButtonRowItem;

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 6,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.medium,
  },
  button_active: {
    borderColor: colors.primary,
  },
});
