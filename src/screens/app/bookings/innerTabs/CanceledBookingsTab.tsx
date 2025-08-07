import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';

import CancelledBookingCard from '../components/CancelledBookingCard';

import { normalizePixelSize } from '@app/utils/normalize';

import { colors } from '@app/theme';

const CanceledBookingsTab = () => {
  return (
    <ScrollView style={styles.main} contentContainerStyle={styles.scrollContent}>
      <CancelledBookingCard />
    </ScrollView>
  );
};

export default CanceledBookingsTab;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.light,
  },
  scrollContent: {
    backgroundColor: colors.light,
    paddingHorizontal: normalizePixelSize(20, 'width'),
    paddingVertical: normalizePixelSize(20, 'height'),
    gap: normalizePixelSize(48, 'height'),
  },
});
