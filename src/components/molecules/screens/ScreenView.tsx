import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import React from 'react';

import { normalizePixelSize } from '@app/utils/normalize';
import { colors } from '@app/theme/colors';

type Props = {
  children: React.ReactNode,
  justifyContent?: 'space-between',
  contentContainerStyle?: StyleProp<ViewStyle>,
  nestedScrollEnabled?: boolean;
  keyboardShouldPersistTaps?:  boolean | 'always' | 'never' | 'handled' | undefined;
  theme?: 'primary' | 'light';
  paddingH?: '20';
}

const ScreenView = (props: Props) => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      {/* <StatusBar barStyle={'light-content'} backgroundColor={colors.red} /> */}
      <ScrollView
        {...props}
        style={styles.main}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps={props.keyboardShouldPersistTaps ?? 'handled'}
        contentContainerStyle={[
          styles.scrollContent,
          props.contentContainerStyle,
          props.paddingH === '20' && styles.paddingH20,
          props.justifyContent === 'space-between' && styles.scrollContentJC_SB,
        ]}
        >
            {props.children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenView;

const PADDING_BOTTOM = Platform.OS === 'ios' ? 10 : 30;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {},
  scrollContent: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingHorizontal: 24,
    // paddingTop: 40,
    // paddingBottom: 20,
    gap: 40,
  },
  scrollContentJC_SB: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: normalizePixelSize(PADDING_BOTTOM, 'height'),
    gap: 40,
  },
  paddingH20: {
    paddingHorizontal: normalizePixelSize(20, 'width'),
  },
});
