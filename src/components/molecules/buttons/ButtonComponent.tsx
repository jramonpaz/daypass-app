import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  PressableProps,
} from 'react-native';
import React from 'react';

import TextComponent from '../../atoms/text/TextComponent';

import { colors } from '@app/theme/colors';

export type ButtonComponentProps = PressableProps & {
  title: string,
  isLoading?: boolean
  style?: StyleProp<ViewStyle>;
  theme?: 'default' | 'outline' | 'dark' | 'bluelight';
};

const ButtonComponent = (props: ButtonComponentProps) => {
  if (props.theme === 'bluelight') {
    return (
      <Pressable
        {...props}
        testID={props.testID ?? 'ButtonComponent'}
        style={[
          styles.bluelightTheme,
          props.disabled && styles.buttonDisabled,
          props.style,
        ]}
      >
        {props.isLoading ? (
          <ActivityIndicator color={colors.white} size={'small'} />
        ) : (
          <TextComponent
            size="14"
            textAlign="center"
            color={props.disabled ? 'muted' : 'primary'}
          >
            {props.title}
          </TextComponent>
        )}
      </Pressable>
    );
  }

  if (props.theme === 'dark') {
    return (
      <Pressable
        {...props}
        testID={props.testID ?? 'ButtonComponent'}
        style={[
          styles.darkTheme,
          props.disabled && styles.buttonDisabled,
          props.style,
        ]}
      >
        {props.isLoading ? (
          <ActivityIndicator color={colors.white} size={'small'} />
        ) : (
          <TextComponent
            size="14"
            textAlign="center"
            color={props.disabled ? 'muted' : 'white'}
          >
            {props.title}
          </TextComponent>
        )}
      </Pressable>
    );
  }

  if (props.theme === 'outline') {
    return (
      <Pressable
        {...props}
        testID={props.testID ?? 'ButtonComponent'}
        style={[
          styles.buttonOutline,
          props.disabled && styles.buttonOutlineDisabled,
          props.style,
        ]}
      >
        {props.isLoading ? (
          <ActivityIndicator color={colors.muted} size={'small'} />
        ) : (
          <TextComponent
            size="14"
            textAlign="center"
            color={props.disabled ? 'muted' : 'primary'}
          >
            {props.title}
          </TextComponent>
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      {...props}
      testID={props.testID ?? 'ButtonComponent'}
      style={[
        styles.button,
        props.disabled && styles.buttonDisabled,
        props.style,
      ]}
    >
      {props.isLoading ? (
        <ActivityIndicator color={colors.white} size={'small'} />
      ) : (
        <TextComponent
          size="14"
          textAlign="center"
          color={props.disabled ? 'muted' : 'white'}
        >
          {props.title}
        </TextComponent>
      )}
    </Pressable>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    // flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    height: 52,
    backgroundColor: colors.lowlight,
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.blueSecondary,
    borderWidth: 1,
  },
  buttonOutlineDisabled: {
    height: 52,
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  darkTheme: {
    backgroundColor: colors.dark,
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bluelightTheme: {
    backgroundColor: colors.blueSecondary,
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
