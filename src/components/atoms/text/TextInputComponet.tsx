import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import React from 'react';
import { colors } from '@app/theme/colors';

export type TextInputComponetProps = TextInputProps & {
  type?: 'email' | 'password' | 'numeric' | 'phone-number' | 'default',
  disabled?: boolean
};

const TextInputComponet = (props: TextInputComponetProps) => {
  if (props.type === 'email') {
    return (
      <TextInput
        { ...props }
        testID={ props.testID ?? 'TextInputComponent' }
        placeholderTextColor={ props.placeholderTextColor || colors.muted }
        placeholder={ props.placeholder ?? '' }
        secureTextEntry={ props.secureTextEntry }
        keyboardType={'email-address'}
        style={[ styles.input, props.disabled && styles.inputDisabled, props.style ]}
      />
    );
  }

  if (props.type === 'password') {
    return (
      <TextInput
        { ...props }
        testID={ props.testID ?? 'TextInputComponent' }
        placeholderTextColor={ props.placeholderTextColor || colors.muted }
        placeholder={ props.placeholder ?? '' }
        secureTextEntry={ props.type === 'password' || props.secureTextEntry}
        keyboardType={ 'default' }
        style={[ styles.input, props.disabled && styles.inputDisabled, props.style ]}
      />
    );
  }

  if (props.type === 'phone-number') {
    return (
      <TextInput
        { ...props }
        testID={ props.testID ?? 'TextInputComponent' }
        placeholderTextColor={ props.placeholderTextColor || colors.muted }
        placeholder={ props.placeholder ?? '' }
        secureTextEntry={ props.secureTextEntry ?? false}
        keyboardType={ 'phone-pad' }
        style={[ styles.input, props.disabled && styles.inputDisabled, props.style ]}
      />
    );
  }

  if (props.type === 'numeric') {
    return (
      <TextInput
        { ...props }
        testID={ props.testID ?? 'TextInputComponent' }
        placeholderTextColor={ props.placeholderTextColor || colors.muted }
        placeholder={ props.placeholder ?? '' }
        secureTextEntry={ props.secureTextEntry ?? false}
        keyboardType={ props.keyboardType ?? 'number-pad' }
        style={[ styles.input, props.disabled && styles.inputDisabled, props.style ]}
      />
    );
  }

  return (
    <TextInput
      { ...props }
      testID={ props.testID ?? 'TextInputComponent' }
      placeholderTextColor={ props.placeholderTextColor || colors.muted }
      placeholder={ props.placeholder ?? '' }
      secureTextEntry={ props.secureTextEntry }
      keyboardType={ props.keyboardType }
      style={[ styles.input, props.disabled && styles.inputDisabled, props.style ]}
    />
  );
};

export default TextInputComponet;

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    fontWeight: '400',
    minWidth: 280,
    // lineHeight: 0,
    margin: 0,
    padding: 0,
    color: colors.dark,
    fontFamily: 'Strawford-Regular',
  },
  inputDisabled: {
    color: colors.muted,
  },
});
