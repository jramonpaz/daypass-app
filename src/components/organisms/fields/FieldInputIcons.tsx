import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';

import { FiledBaseProps } from './FieldBase';
import { colors } from '@app/theme/colors';
import { Image } from 'react-native-reanimated/lib/typescript/Animated';
import TextComponent from '../../atoms/text/TextComponent';
import TextInputComponet from '../../atoms/text/TextInputComponet';

export type FieldInputIconsProps = FiledBaseProps & {
  leftIcon?: React.ReactNode;
  rigtIcon?: React.ReactNode;
};

const FieldInputIcons = (props: FieldInputIconsProps) => {
  return (
    <Pressable style={styles.filterContainer} onPress={props.onPress}>
      <View style={styles.row}>
        { props.leftImage && (
          <View>
            <Image source={props.leftImage} style={styles.filterIcon} />
          </View>
        )}
        <View>
          <TextComponent color="muted" size="12" >{props.label}</TextComponent>
          {!props.input && (
            <TextComponent color="dark" size="14" style={styles.input} >{props.value ?? ''}</TextComponent>
          )}
          {!!props.input && (
            <TextInputComponet
              {...props}
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
      </View>
      {props.children}
    </Pressable>
  );
};

export default FieldInputIcons;

const styles = StyleSheet.create({
  filterContainer: {
    borderWidth: 0.5,
    borderColor: '#788298',
    borderRadius: 16,
    backgroundColor: '#F7F9FC',
  },
  row: {
    gap: 12,
    height: 58,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterIcon: {
    width: 20,
    height: 20,
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
  },
});
