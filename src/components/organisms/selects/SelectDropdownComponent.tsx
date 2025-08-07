import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { chevron_down_icon, chevron_up_icon } from '@app/utils/images';
import { colors } from '@app/theme';
import { normalizePixelSize } from '@app/utils/normalize';

type Props = {
  data: any[];
  label: string;
  onChange?: (data: any, index: number) => void;
}
const SelectDropdownComponent = (props: Props) => {
  return (
    <SelectDropdown
      data={props.data}
      onSelect={(selectedItem, index ) => {
        props.onChange && props.onChange(selectedItem, index);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.container}>
            <TextComponent size="12" color="dark" >
              {(selectedItem && selectedItem) || props.label}
            </TextComponent>
            <Image
              source={isOpened ? chevron_up_icon : chevron_down_icon}
              style={styles.chevron_icon}
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View key={index} style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
            <TextComponent textAlign="left">{item?.title ?? item}</TextComponent>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

export default SelectDropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    // width: 200,
    borderWidth: 0.5,
    borderColor: colors.muted,
    height: normalizePixelSize(28, 'height'),
    paddingHorizontal: 8,
    borderRadius: 14,
  },
  chevron_icon: {
    width: 16,
    height: 16,
    marginLeft: 10,
    tintColor: colors.dark,
  },
  dropdownMenuStyle: {
    backgroundColor: colors.white,
    // flex: 1,
    // paddingHorizontal: 10,
    borderRadius: 8,
    top: -10,
  },
  dropdownItemStyle: {
    // width: '100%',
    // width: 300,
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
});
