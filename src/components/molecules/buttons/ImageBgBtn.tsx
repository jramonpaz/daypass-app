import {
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React, { ReactNode } from 'react';

import TextComponent from '../../atoms/text/TextComponent';

import { colors } from '@app/theme/colors';

type Props = {
  imageBg: ImageSourcePropType;
  label: string | ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
};

const ImageBgBtn = (props: Props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={[styles.container, props.style]}
    >
      <ImageBackground
        source={props.imageBg}
        style={[styles.imageBg, props.style]}
      >
        <View style={[styles.content, props.style]}>
          <TextComponent
            weight="bold"
            color="white"
            size="18"
          >
            {props.label}
          </TextComponent>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default ImageBgBtn;

const styles = StyleSheet.create({
  container: {
    minWidth: 152,
    minHeight: 152,
    borderRadius: 16,
    overflow: 'hidden',
    // flexGrow: 1,
    // flex: 1,
  },
  imageBg: {
    minWidth: 152,
    minHeight: 152,
    borderRadius: 16,
  },
  content: {
    minWidth: 152,
    minHeight: 152,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black_a40,
  },
});
