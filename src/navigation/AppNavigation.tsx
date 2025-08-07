import React, { useCallback, useEffect } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useAppDispatch } from '@app/hooks/redux.hook';
import { loadUserDataFromStorage } from '@app/store/slices/auth/auth.service';
// import { readGeneralCurrencySelected, readGeneralSelectedLanguage } from '@app/store/slices/general/general.service';

import { AuthStackParamList } from './stacks/AuthStack';
import NavBarBottom, { NavBarBottomTabParams } from './NavBarBottom';
import DrawerMenu from './drawer/DrawerMenu';

export type RootStackParamList = {
  NAV_BAR_BOTTOM: BottomTabScreenProps<NavBarBottomTabParams>;
}

export type AuthFlowParamList = {
  SIGNIN_USER: NavigatorScreenParams<AuthStackParamList>;
};

const Drawer = createDrawerNavigator<RootStackParamList>();

const AppNavigation = () => {
  const dispatch = useAppDispatch();

  const loadData = useCallback(async () => {
      // await dispatch(readGeneralSelectedLanguage());
      // await dispatch(readGeneralCurrencySelected());
      await dispatch(loadUserDataFromStorage());
    },
    [dispatch],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="NAV_BAR_BOTTOM"
        screenOptions={{headerShown: true, swipeEnabled: false}}
        // eslint-disable-next-line react/no-unstable-nested-components
        drawerContent={(props) => <DrawerMenu {...props} />}
      >
        <Drawer.Screen
          name="NAV_BAR_BOTTOM"
          component={NavBarBottom}
          options={{
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );

};

export default AppNavigation;
