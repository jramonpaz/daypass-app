import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { NavBarBottomTabParams } from '@app/navigation/NavBarBottom';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '@app/hooks/redux.hook';
import { AuthStackParamList } from '@app/navigation/stacks/AuthStack';
import { navigationActions } from '@app/store/slices/navigation/navigation.slice';

import TextComponent from '@app/components/atoms/text/TextComponent';
import ButtonComponent from '@app/components/molecules/buttons/ButtonComponent';

import { normalizePixelSize } from '@app/utils/normalize';

import { colors } from '@app/theme';

type NavigationType = CompositeNavigationProp<
  NavigationProp<NavBarBottomTabParams>,
  NavigationProp<AuthStackParamList>
>;

const NoAuthScreen = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationType>();

  function handleGoToAuth () {
    const prevState = navigation.getState();
    dispatch(navigationActions.setPreviousNavigation(prevState));
    navigation.navigate('AUTH_TAB_STACK', {screen: 'SIGN_IN_SCREEN'});
  }

  return (
    <View style={styles.container}>
      <TextComponent>{t('login_required')}</TextComponent>
      <ButtonComponent
        title={t('login')}
        onPress={handleGoToAuth}
        style={styles.btnAction}
      />
    </View>
  );
};

export default NoAuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: normalizePixelSize(20, 'width'),
    gap: 20,
  },
  btnAction: {
    paddingHorizontal: normalizePixelSize(30, 'width'),
  },
});
