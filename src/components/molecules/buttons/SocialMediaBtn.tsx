import {
  ActivityIndicator,
  Image,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import React from 'react';

import TextComponent from '../../atoms/text/TextComponent';

import { colors } from '@app/theme/colors';
import { facebook_color_icon, google_color_icon } from '@app/utils/images';

type Props = PressableProps &  {
  title: string;
  isLoading?: boolean;
  socialType?: 'facebook' | 'google';
  style?: StyleProp<ViewStyle>;
}

const SocialMediaBtn = (props: Props) => {
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
          {props.socialType === 'facebook' && (
            <Image source={facebook_color_icon} style={styles.logoIcon} />
          )}

          {props.socialType === 'google' && (
            <Image source={google_color_icon} style={styles.logoIcon} />
          )}
          <TextComponent
            size="14"
            textAlign="center"
            color={props.disabled ? 'muted' : 'dark'}
          >
            {props.title}
          </TextComponent>
        </>
      )}
    </Pressable>
  );
};

export default SocialMediaBtn;

const styles = StyleSheet.create({
  button: {
    // flex: 1,
    backgroundColor: colors.white,
    borderRadius: 30,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    borderColor: colors.muted,
    borderWidth: 0.5,
  },
  buttonDisabled: {
    // flex: 1,
    backgroundColor: colors.lowlight,
    borderRadius: 26,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    borderColor: colors.muted,
    borderWidth: 0.5,
  },
  logoIcon: {
    width: 24,
    height: 24,
  },
});
