/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import { DrawerActions, getFocusedRouteNameFromRoute, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAppSelector } from '@app/hooks/redux.hook';

import FavoritiesStack, { FavoritiesStackParamList } from './FavoritiesStack';
import AccountTabStack, { AccountTabStackParamList } from './stacks/AccountTabStack';
import ExploreTabStack, { ExploreTabStackParamList } from './ExploreTabStack';
import BookingsTabStack, { BookingsTabStackParamList } from './BookingsTabStack';
import AuthStack, { AuthStackParamList } from './stacks/AuthStack';

import NoAuthScreen from '@app/screens/app/auth/NoAuthScreen';
import DrawerAppHeader from '@app/components/organisms/header/DrawerAppHeader';

import { normalizePixelSize } from '@app/utils/normalize';

import {
  heart_icon,
  heart_outline_icon,
  profile_icon,
  profile_outline_icon,
  search_icon,
  suitcase_icon,
  suitcase_outline_icon,
} from '../utils/images';
import { colors } from '../theme/colors';
import { useTranslation } from 'react-i18next';

export type NavBarBottomTabParams = {
  EXPLORE_TAB_STACK: NavigatorScreenParams<ExploreTabStackParamList>;
  FAVORITIES_TAB_STACK: NavigatorScreenParams<FavoritiesStackParamList>;
  BOOKINGS_TAB_STACK: NavigatorScreenParams<BookingsTabStackParamList>;
  ACCOUNT_TAB_STACK: NavigatorScreenParams<AccountTabStackParamList>;
  AUTH_TAB_STACK: NavigatorScreenParams<AuthStackParamList>;
}

const Tab = createBottomTabNavigator<NavBarBottomTabParams>();

const renderTabBarIcon = (
  route: RouteProp<NavBarBottomTabParams, keyof NavBarBottomTabParams>,
  focused: boolean,
  // color: string,
  // size: number,
): React.ReactNode | undefined => {
  if (route.name === 'EXPLORE_TAB_STACK') {
    return (
      <Image
        source={search_icon}
        style={focused ? styles.tabIconActiveTint : styles.tabIcon}
      />
    );
  }

  if (route.name === 'BOOKINGS_TAB_STACK') {
    return (
      <Image
        source={focused ? suitcase_icon : suitcase_outline_icon}
        style={focused ? styles.tabIconActiveTint : styles.tabIcon}
      />
    );
  }

  if (route.name === 'FAVORITIES_TAB_STACK') {
    return (
      <Image
        source={focused ? heart_icon : heart_outline_icon}
        style={focused ? styles.tabIconActiveTint : styles.tabIcon}
      />
    );
  }

  if (route.name === 'ACCOUNT_TAB_STACK') {
    return (
      <Image
        source={focused ? profile_icon : profile_outline_icon}
        style={focused ? styles.tabIconActiveTint : styles.tabIcon}
      />
    );
  }

  return undefined;
};

const DEVICE_INSETS = normalizePixelSize(Platform.OS === 'ios' ? 14 : 0, 'height');
const TAB_BAR_HEIGHT = 60 + DEVICE_INSETS;

const NavBarBottom = () => {
  const { t } = useTranslation();
  const { isAuth, userDetail } = useAppSelector((state) => state.auth);

  const isLoggedIn = !!isAuth && !!userDetail;

  return (
    <Tab.Navigator
      initialRouteName="EXPLORE_TAB_STACK"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => renderTabBarIcon(route, focused),
        tabBarItemStyle: {
          height: 40,
        },
        tabBarAllowFontScaling: false,
        tabBarStyle: {
          backgroundColor: 'white',
          height: normalizePixelSize(TAB_BAR_HEIGHT, 'height'),
          padding: 6,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#203ED5',
        tabBarInactiveTintColor: '#B1BBC6',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="EXPLORE_TAB_STACK"
        component={ExploreTabStack}
        options={({ route }) => {
          const focusedRouteName = getFocusedRouteNameFromRoute(route);
          const showTabBarOn = ['EXPLORE_TAB_SCREEN'];

          if (!focusedRouteName || showTabBarOn.indexOf(focusedRouteName) >= 0) {
            return {
              title: t('explore'),
              tabBarStyle: {
                display: 'flex',
                backgroundColor: 'white',
                height: normalizePixelSize(TAB_BAR_HEIGHT, 'height'),
                padding: 6,
              },
            };
          }

          return {
            tabBarStyle: {
              display: 'none',
              backgroundColor: 'white',
              height: normalizePixelSize(TAB_BAR_HEIGHT, 'height'),
            },
          };
        }}
      />

      <Tab.Screen
        name="BOOKINGS_TAB_STACK"
        component={isLoggedIn ? BookingsTabStack : NoAuthScreen}
        options={({ route }) => {
          const focusedRouteName = getFocusedRouteNameFromRoute(route);
          const showTabBarOn = ['BOOKINGS_TAB_SCREEN'];

          if (!focusedRouteName || showTabBarOn.indexOf(focusedRouteName) >= 0) {
            return {
              title: t('bookings'),
              tabBarStyle: {
                display: 'flex',
                backgroundColor: 'white',
                height: normalizePixelSize(TAB_BAR_HEIGHT, 'height'),
                padding: 6,
              },
              header: (props) =>
                !isLoggedIn ? (
                  <DrawerAppHeader
                    {...props}
                    titleType="appicon"
                    leftIconType="menu"
                    onPressLeftButton={() => props.navigation.dispatch(DrawerActions.openDrawer())}
                  />
                ) : undefined,
              headerShown: !isLoggedIn,
            };
          }

          return {
            tabBarStyle: {
              display: 'none',
              backgroundColor: 'white',
            },
          };
        }}
      />

      <Tab.Screen
        name="FAVORITIES_TAB_STACK"
        component={isLoggedIn ? FavoritiesStack : NoAuthScreen}
        options={({ route }) => {
          const focusedRouteName = getFocusedRouteNameFromRoute(route);
          const showTabBarOn = ['FAVORITIES_SCREEN'];

          if (!focusedRouteName || showTabBarOn.indexOf(focusedRouteName) >= 0) {
            return {
              title: t('favorites'),
              tabBarStyle: {
                display: 'flex',
                backgroundColor: 'white',
                height: normalizePixelSize(TAB_BAR_HEIGHT, 'height'),
                padding: 6,
              },
              header: (props) =>
                !isLoggedIn ? (
                  <DrawerAppHeader
                    {...props}
                    titleType="appicon"
                    leftIconType="menu"
                    onPressLeftButton={() => props.navigation.dispatch(DrawerActions.openDrawer())}
                  />
                ) : undefined,
              headerShown: !isLoggedIn,
            };
          }

          return {
            tabBarStyle: {
              title: t('favorites'),
              display: 'none',
              backgroundColor: 'white',
            },
          };
        }}
      />
      <Tab.Screen
        name="ACCOUNT_TAB_STACK"
        component={isLoggedIn ? AccountTabStack : NoAuthScreen}
        options={({ route }) => {
          const focusedRouteName = getFocusedRouteNameFromRoute(route);
          const showTabBarOn = ['PROFILE_SCREEN'];

          if (!focusedRouteName || showTabBarOn.indexOf(focusedRouteName) >= 0) {
            return {
              title: t('profile'),
              tabBarStyle: {
                display: 'flex',
                backgroundColor: 'white',
                height: normalizePixelSize(TAB_BAR_HEIGHT, 'height'),
                padding: 6,
              },
              header: (props) =>
                !isLoggedIn ? (
                  <DrawerAppHeader
                    {...props}
                    titleType="appicon"
                    leftIconType="menu"
                    onPressLeftButton={() => props.navigation.dispatch(DrawerActions.openDrawer())}
                  />
                ) : undefined,
              headerShown: !isLoggedIn,
            };
          }

          return {
            tabBarStyle: {
              title: t('profile'),
              display: 'none',
              backgroundColor: 'white',
              height: normalizePixelSize(TAB_BAR_HEIGHT, 'height'),
              padding: 6,
            },
          };
        }}
      />

      <Tab.Screen
        name="AUTH_TAB_STACK"
        component={AuthStack}
        options={{
          tabBarStyle: {
            display: 'none',
          },
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default NavBarBottom;

const styles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.secondary,
  },
  tabIconActiveTint: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.primary,
  },
});
