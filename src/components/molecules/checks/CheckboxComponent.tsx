import { Image, NativeSyntheticEvent, Pressable, StyleSheet, TargetedEvent } from 'react-native';
import React from 'react';

import { checkbox_check_icon, checkbox_outline_icon } from '@app/utils/images';

type Props = {
  isActive?: boolean;
  color?: string;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
};

const CheckboxComponent = (props: Props) => {

  const handleOnChange = () => {
    const newValue = !props.isActive;
    props.onChange && props.onChange(newValue);
  };

  return (
    <Pressable
      onPress={handleOnChange}
      disabled={props.disabled}
      onBlur={props.onBlur}
    >
      {props.isActive ? (
        <Image
          source={checkbox_check_icon}
          style={styles.check}
        />
      ) : (
        <Image
          source={checkbox_outline_icon}
          style={styles.check}
        />
      )}
    </Pressable>
  );
};

export default CheckboxComponent;

const styles = StyleSheet.create({
  container: {

  },
  check: {
    width: 20,
    height: 20,
  },
});
