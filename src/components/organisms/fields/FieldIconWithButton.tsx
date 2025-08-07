import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';
import TextInputComponet from '@app/components/atoms/text/TextInputComponet';
import { FiledBaseProps } from './FieldBase';

import { colors } from '@app/theme';
import ButtonComponent from '@app/components/molecules/buttons/ButtonComponent';
import { normalizePixelSize } from '@app/utils/normalize';

type FieldIconWithButtonProps = FiledBaseProps & {
  actionLabel?: string;
  onActionPress?: (value: string) => void;
}

const FieldIconWithButton = (props: FieldIconWithButtonProps) => {
  const [value, setValue] = useState(props.value || '');

  const handleOnChange = (inputValue: string) => {
    setValue(inputValue);
    props.onChangeText && props.onChangeText(inputValue);
  };

  const handleActionPress = () => {
    props.onActionPress && props.onActionPress(value);
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
        { props.leftImage && (
          <View>
            <Image source={props.leftImage} style={styles.filterIcon} />
          </View>
        )}
        <View style={styles.content}>
          {!!props.label && (
            <TextComponent color="muted" size="12" >{props.label}</TextComponent>
          )}
          {!props.input && (
            <TextComponent color="dark" size="14" style={styles.input} >{props.value ?? ''}</TextComponent>
          )}
          {!!props.input && (
            <TextInputComponet
              {...props}
              value={value}
              placeholder={props.placeholder}
              type={props.type}
              onChangeText={handleOnChange}
              style={styles.input}
            />
          )}
        </View>

        {props.actionLabel && (
          <ButtonComponent
            title={props.actionLabel}
            onPress={handleActionPress}
            style={styles.actionButton}
          />
        )}
      </View>
      {props.children}
    </Pressable>
  );
};

export default FieldIconWithButton;

const styles = StyleSheet.create({
  filterContainer: {
    borderWidth: 0.5,
    borderColor: colors.muted,
    borderRadius: 16,
    backgroundColor: colors.light,
  },
  row: {
    // gap: 12,
    height: 58,
    // paddingHorizontal: 20,
    // paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  filterIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.primary,
    marginLeft: 20,
    marginRight: 10,
    flexGrow: 1,
    flexShrink: 1,
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
    flex: 1,
    // width: 140,
    minWidth: 200,
    flexGrow: 1,
    flexShrink: 1,
    // backgroundColor: colors.primary,
  },
  content: {
    // backgroundColor: 'red',
  },
  focused: {
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: 16,
    backgroundColor: colors.light,
  },
  actionButton: {
    // flex: 1,
    // flexGrow: 1,
    // flexShrink: 1,
    marginRight: normalizePixelSize(3),
    borderRadius: 14,
  },
});
