import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { getFAQsService } from '@app/store/slices/faqs/faqs.service';

import FAQItem from './components/FAQItem';

import { normalizePixelSize } from '@app/utils/normalize';
import { colors } from '@app/theme';

const FAQsScreen = () => {
  const dispatch = useAppDispatch();
  const {faqs} = useAppSelector(state =>  state.faqs);

  useFocusEffect(
    useCallback(
      () => {
        dispatch(getFAQsService());
      },
      [dispatch],
    )
  );

  return (
    <ScrollView style={styles.main} contentContainerStyle={styles.content}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      {faqs.map((faq, idx) => (
        <FAQItem faq={faq} key={`${idx}-${faq.title}`} />
      ))}
    </ScrollView>
  );
};

export default FAQsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    gap: normalizePixelSize(24, 'height'),
    paddingHorizontal: normalizePixelSize(20, 'width'),
    paddingVertical: normalizePixelSize(20, 'height'),
  },
});


