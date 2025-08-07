import { ColorValue, Platform, StyleSheet, Text, TextProps } from 'react-native';
import React from 'react';
import { colors } from '@app/theme/colors';
import { normalizeFontSize } from '@app/utils/normalize';

export type TextComponentColors = 'primary' | 'secondary' | 'dark' | 'muted' | 'white' | 'yellow' | 'green' | 'medium';

type Props = TextProps & {
  size?:  '10' | '11' | '12' | '14' | '16' | '18' | '20' | '22' | '24' | '28';
  color?: TextComponentColors,
  textAlign?: 'left' | 'center' | 'right';
  weight?: 'bold' | 'semibold' | 'light';
  font?: 'bold' | 'italic' | 'regular';
  customColor?: ColorValue;
  underline?: boolean;
  lineThrough?: boolean;
  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through' | undefined,
  transform2?: 'uppercase' | 'lowercase' | 'capitalize',
};

const TextComponent = (props: Props) => {
  return (
    <Text
      {...props}
      testID={props.testID ?? 'TextComponent'}
      style={[
        styles.text,
        props.size === '10' && styles.size10,
        props.size === '11' && styles.size11,
        props.size === '12' && styles.size12,
        props.size === '14' && styles.size14,
        props.size === '16' && styles.size16,
        props.size === '18' && styles.size18,
        props.size === '20' && styles.size20,
        props.size === '22' && styles.size22,
        props.size === '24' && styles.size24,
        props.size === '28' && styles.size28,
        props.weight === 'bold' && styles.bold,
        props.weight === 'semibold' && styles.semibold,
        props.weight === 'light' && styles.light,
        props.color === 'primary' && styles.primaryColor,
        props.color === 'secondary' && styles.secondaryColor,
        props.color === 'dark' && styles.darkColor,
        props.color === 'muted' && styles.mutedColor,
        props.color === 'white' && styles.whiteColor,
        props.color === 'yellow' && styles.yellowColor,
        props.color === 'green' && styles.greenColor,
        props.color === 'medium' && styles.mediumColor,
        props.customColor && { color: props.color },
        props.textAlign === 'left' && styles.left,
        props.textAlign === 'center' && styles.center,
        props.textAlign === 'right' && styles.right,
        props.font === 'bold' && styles.boldText,
        props.font === 'italic' && styles.italicText,
        props.font === 'regular' && styles.regularText,
        props.transform2 === 'uppercase' && styles.uppercase,
        props.transform2 === 'lowercase' && styles.lowercase,
        props.transform2 === 'capitalize' && styles.capitalize,
        props.underline && styles.underlineText,
        props.lineThrough && styles.lineThroughText,
        props.textDecorationLine && { textDecorationLine: props.textDecorationLine },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};
export default TextComponent;


const styles = StyleSheet.create({
  text: {
    color: colors.dark,
    fontSize: normalizeFontSize(12),
    fontWeight: '400',
    fontFamily: 'Strawford-Regular',
    flexShrink: 1,
  },
  size10: {
    fontSize: normalizeFontSize(10),
  },
  size11: {
    fontSize: normalizeFontSize(11),
  },
  size12: {
    fontSize: normalizeFontSize(12),
  },
  size14: {
    fontSize: normalizeFontSize(14),
  },
  size16: {
    fontSize: normalizeFontSize(16),
  },
  size18: {
    fontSize: normalizeFontSize(18),
  },
  size20: {
    fontSize: normalizeFontSize(20),
  },
  size22: {
    fontSize: normalizeFontSize(22),
  },
  size24: {
    fontSize: normalizeFontSize(24),
  },
  size28: {
    fontSize: normalizeFontSize(28),
  },
  bold: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'regular',
    fontFamily: 'Strawford-Bold',
  },
  semibold: {
    fontWeight: Platform.OS === 'ios' ? 'semibold' : 'regular',
    fontFamily: 'Strawford-Medium',
  },
  light: {
    fontWeight: Platform.OS === 'ios' ? 'light' : 'regular',
    fontFamily: 'Strawford-Light',
  },
  left: {
    textAlign: 'left',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  primaryColor: {
    color: colors.primary,
  },
  secondaryColor: {
    color: colors.secondary,
  },
  darkColor: {
    color: colors.dark,
  },
  mutedColor: {
    color: colors.muted,
  },
  whiteColor: {
    color: colors.white,
  },
  yellowColor: {
    color: colors.yellow,
  },
  greenColor: {
    color: colors.green,
  },
  mediumColor: {
    color: colors.medium,
  },
  boldText: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'regular',
    fontFamily: 'Strawford-Bold',
  },
  italicText: {
    fontStyle: 'italic',
    fontFamily: 'Strawford-RegularItalic',
  },
  regularText: {
    fontFamily: 'Strawford-Regular',
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  lineThroughText: {
    textDecorationLine: 'line-through',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  lowercase: {
    textTransform: 'lowercase',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
});
