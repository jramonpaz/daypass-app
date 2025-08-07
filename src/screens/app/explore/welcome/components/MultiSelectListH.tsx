import { Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { star_icon } from '@app/utils/images';
import { colors } from '@app/theme/colors';

type Props = {
  range: string[],
  selects: string[],
  onChange?: (data: string[]) => void;
};

const MultiSelectListH = (props: Props) => {

  const handleOnChange = (item: any) => {
    const active = isActive(item);

    if (active) {
      const newData = props.selects.filter(i => i !== item);
      // setSelectedItems(newData);
      props.onChange && props.onChange(newData);
    } else {
      const newData = [...new Set([...props.selects, item])];
      // setSelectedItems(newData);
      props.onChange && props.onChange(newData);
    }
  };

  const isActive = (item: string) => {
    return props.selects.find(i => item === i);
  };

  return (
    <ScrollView
      horizontal
      style={styles.scroll}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {props.range.map((item, index) => (
        <Pressable
          style={[styles.button, isActive(item) && styles.buttonActive]}
          key={`${index}@${Date.now()}`}
          onPress={() => handleOnChange(item)}
        >
          <Image source={star_icon} style={styles.buttonIcon} />
          <TextComponent
            size="16"
            weight="semibold"
            color={isActive(item) ? 'white' : 'dark'}
          >
            {item}
          </TextComponent>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default MultiSelectListH;

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    zIndex: 24,
  },
  scrollContent: {
    gap: 8,
    // paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.lowlight,
    borderRadius: 28,
  },
  buttonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
