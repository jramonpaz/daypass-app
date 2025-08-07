import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { normalizePixelSize } from '@app/utils/normalize';

// import { IQuestionAndAnswer } from '../FAQsScreen';
import { chevron_down_icon, chevron_up_icon } from '@app/utils/images';

import { colors } from '@app/theme';
import { IQuestionAndAnswer } from '@app/store/slices/faqs/faqs.slice';

type Props = {
  faq: IQuestionAndAnswer
  isOpen?: boolean
}

const FAQItem = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen || false);

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <Pressable style={styles.container} onPress={toggleIsOpen}>
      <View style={styles.head}>
        <TextComponent color="dark" size="14" weight="bold">
          {props.faq.title}
        </TextComponent>
        <Image
          source={isOpen ? chevron_up_icon : chevron_down_icon}
          style={styles.icon}
        />
      </View>

      {isOpen && (
        <TextComponent color="dark" size="14">
          {props.faq.description}
        </TextComponent>
      )}
    </Pressable>
  );
};

export default FAQItem;

const styles = StyleSheet.create({
  container: {
    gap: normalizePixelSize(24, 'height'),
  },
  head: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    gap: normalizePixelSize(32, 'width'),
    // marginBottom: normalizePixelSize(8, 'height'),?
  },
  icon: {
    width: normalizePixelSize(20, 'height'),
    height: normalizePixelSize(20, 'height'),
    tintColor: colors.primary,
  },
  body: {},
});
