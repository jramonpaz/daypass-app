import { ActivityIndicator, Image, ImageSourcePropType, ImageStyle, Pressable, StyleProp, StyleSheet } from 'react-native';
import React from 'react';

import { ButtonComponentProps } from './ButtonComponent';
import { colors } from '@app/theme';
import TextComponent from '@app/components/atoms/text/TextComponent';

type ButtonWithIconProps = ButtonComponentProps & {
  leftImageSource?: ImageSourcePropType;
  leftImageStyle?: StyleProp<ImageStyle>;
  hideTitle?: boolean;
};

const ButtonWithIcon = (props: ButtonWithIconProps) => {
  if (props.theme === 'outline') {
    return (
      <Pressable
        {...props}
        testID={props.testID ?? 'ButtonComponent'}
        style={[
          styles.outline,
          props.disabled && styles.outlineDisabled,
          props.style,
        ]}
      >
        {props.isLoading ? (
          <ActivityIndicator color={colors.white} size={'small'} />
        ) : (
          <>
            {props.leftImageSource && (
              <Image
                source={props.leftImageSource}
                style={[styles.outlineLeftIcon, props.leftImageStyle]}
              />
            )}
            {!props.hideTitle && (
              <TextComponent
                size="14"
                textAlign="center"
                color={props.disabled ? 'muted' : 'primary'}
              >
                {props.title}
              </TextComponent>
            )}
          </>
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
          <>
            {props.leftImageSource && (
              <Image
                source={props.leftImageSource}
                style={[styles.leftIcon, props.leftImageStyle]}
              />
            )}
            {!props.hideTitle && (
              <TextComponent
                size="14"
                textAlign="center"
                color={props.disabled ? 'muted' : 'white'}
              >
                {props.title}
              </TextComponent>
            )}
          </>
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
        <>
          {props.leftImageSource && (
            <Image
              source={props.leftImageSource}
              style={[styles.leftIcon, props.leftImageStyle]}
            />
          )}
          {!props.hideTitle && (
            <TextComponent
              size="14"
              textAlign="center"
              color={props.disabled ? 'muted' : 'white'}
            >
              {props.title}
            </TextComponent>
          )}
        </>
      )}
    </Pressable>
  );
};

export default ButtonWithIcon;

const styles = StyleSheet.create({
  button: {
    // flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  buttonDisabled: {
    height: 52,
    backgroundColor: colors.lowlight,
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  leftIcon: {
    width: 20,
    height: 20,
    tintColor: colors.white,
    resizeMode: 'contain',
    // marginLeft: 12,
  },
  darkTheme: {
    backgroundColor: colors.dark,
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  outline: {
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    borderColor: colors.blueSecondary,
    borderWidth: 1,
  },
  outlineDisabled: {
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    borderColor: colors.light,
    borderWidth: 1,
  },
  outlineLeftIcon: {
    width: 20,
    height: 20,
    tintColor: colors.primary,
    resizeMode: 'contain',
  },
  outlineLeftIconDisabled: {
    width: 20,
    height: 20,
    tintColor: colors.light,
    resizeMode: 'contain',
  },
});
