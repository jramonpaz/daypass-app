import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import { FiledBaseProps } from './FieldBase';
import TextComponent from '../../atoms/text/TextComponent';
import TextInputComponet from '../../atoms/text/TextInputComponet';

import { eye_outline_icon, lock_outline_closed } from '@app/utils/images';
import { colors } from '@app/theme/colors';

type Props = FiledBaseProps & {};

const FieldInputPassword = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Pressable
      style={[
        styles.filterContainer,
        props.isFocused && styles.focused,
      ]}
      onPress={props.onPress}
    >
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Image
            source={lock_outline_closed ?? props.leftImage}
            style={styles.filterIcon}
          />
        </View>

        <View style={styles.contentIntput}>
          {!!props.label && (
            <TextComponent color="muted" size="12" >{props.label}</TextComponent>
          )}

          {!props.input && (
            <TextComponent color="dark" size="14" style={styles.input} >{props.value ?? ''}</TextComponent>
          )}
          {!!props.input && (
            <TextInputComponet
              {...props}
              placeholder={props.placeholder}
              type={showPassword ? 'default' : 'password'}
              secureTextEntry={!showPassword}
              onChangeText={props.onChangeText}
              style={styles.input}
            />
          )}
        </View>

        <Pressable style={styles.iconContainer} onPress={handleTogglePassword}>
          <Image
            source={eye_outline_icon ?? props.rightImage}
            style={showPassword ? styles.filterIcon : styles.iconDisabled}
          />
        </Pressable>
      </View>
      {props.children}
    </Pressable>
  );
};

export default FieldInputPassword;

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
    // paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    // backgroundColor: 'red',
  },
  iconContainer: {
    // flexGrow: 1,
    // width: '10%',
    // backgroundColor: 'orange',
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
  contentIntput: {
    width: '80%',
  },
  input: {
    height: 18,
    // width: '20%',
  },
  iconDisabled: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.muted,
  },
  focused: {
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: 16,
    backgroundColor: colors.light,
  },
});
