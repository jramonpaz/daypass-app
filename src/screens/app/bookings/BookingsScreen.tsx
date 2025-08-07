import { StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';

import BookingsTabView from './components/BookingsTabView';

import { colors } from '@app/theme';

const BookingsScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.primary}
        animated={true}
        barStyle={'light-content'}
      />
      <BookingsTabView />
    </View>
  );
};

export default BookingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});
