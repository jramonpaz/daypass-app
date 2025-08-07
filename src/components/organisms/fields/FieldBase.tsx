import { Image, ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';
import React, { PropsWithChildren } from 'react';

import TextComponent from '../../atoms/text/TextComponent';

import { colors } from '@app/theme/colors';
import TextInputComponet, { TextInputComponetProps } from '../../atoms/text/TextInputComponet';
import { normalizeFontSize, normalizePixelSize } from '@app/utils/normalize';

export type FiledBaseProps = PropsWithChildren & TextInputComponetProps & {
  label?: string | React.ReactNode,
  value?: string | React.ReactNode,
  placeholder?: string | React.ReactNode,
  leftImage?: ImageSourcePropType,
  rightImage?: ImageSourcePropType,
  rightComponent?: React.ReactNode;
  testID?: string,
  onPress?: () => void;
  input?: boolean;
  isFocused?: boolean;
  onChangeText?: (text: string) => void;
  disabled?: boolean;
}

const FieldBase = (props: FiledBaseProps) => {
  return (
    <Pressable
      style={[
        styles.filterContainer,
        props.isFocused && styles.focused,
      ]}
      disabled={props.disabled}
      onPress={props.onPress}
    >
      <View style={styles.row}>
        { props.leftImage && (
          <View>
            <Image source={props.leftImage} style={styles.filterIcon} />
          </View>
        )}
        <View>
          {!!props.label && (
            <TextComponent color={props.disabled ? 'medium' : 'muted'} size="12" >{props.label}</TextComponent>
          )}
          {!props.input && props.value && props.value.length > 0 && (
            <TextComponent color="dark" size="14" style={styles.input} >{props.value}</TextComponent>
          )}
          { !props.input && props.placeholder && (!props.value || props.value.length === 0) && (
            <TextComponent color="muted" size="14" style={styles.input}>{props.placeholder}</TextComponent>
          )}
          {!!props.input && (
            <TextInputComponet
              {...props}
              disabled={props.disabled}
              placeholder={props.placeholder}
              type={props.type}
              onChangeText={props.onChangeText}
              style={styles.input}
            />
          )}
        </View>
        { props.rightImage && (
          <View>
            <Image source={props.rightImage} style={styles.filterIcon} />
          </View>
        )}
        { props.rightComponent && (
          <View>
            {props.rightComponent}
          </View>
        )}
      </View>
      {props.children}
    </Pressable>
  );
};

export default FieldBase;

const styles = StyleSheet.create({
  filterContainer: {
    borderWidth: 0.5,
    borderColor: colors.muted,
    borderRadius: 16,
    backgroundColor: colors.light,
  },
  row: {
    gap: 12,
    height: 58,
    paddingHorizontal: 20,
    // paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterIcon: {
    width: normalizePixelSize(20, 'height'),
    height: normalizePixelSize(20, 'height'),
    resizeMode: 'contain',
    tintColor: colors.primary,
  },
  filterTitle: {
    color: colors.muted,
    fontWeight: '400',
    fontSize: 12,
  },
  filterDescription: {
    color: colors.dark,
    fontWeight: '400',
    fontSize: 14,
  },
  input: {
    height: 18,
    fontSize: normalizeFontSize(14),
  },
  focused: {
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: 16,
    backgroundColor: colors.light,
  },
});
