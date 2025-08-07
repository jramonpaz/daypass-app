import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationScreen from '@app/screens/app/notifications/NotificationScreen';
import MainAppHeader from '@app/components/organisms/header/MainAppHeader';

import { colors } from '@app/theme';

export type NotificationsStackParamList = {
  NOTIFICATIONS_SCREEN: undefined,
};

const Stack = createNativeStackNavigator<NotificationsStackParamList>();

const NotificationsStack = () => {
  return (
    <Stack.Navigator initialRouteName="NOTIFICATIONS_SCREEN">
      <Stack.Screen
        name="NOTIFICATIONS_SCREEN"
        component={NotificationScreen}
        options={{
          title: 'Notificaciones',
          statusBarHidden: false,
          statusBarStyle: 'light',
          statusBarColor: colors.primary,
          // headerBackImageSource: chevron_left__white_icon,
          // headerTintColor: colors.white,
          // headerTitleAlign: 'center',
          // headerTitleStyle: {
          //   fontSize: normalizeFontSize(18),
          //   fontFamily: 'Strawford-Regular',
          //   fontWeight: 'bold',
          // },
          // headerStyle: {
          //   backgroundColor: colors.primary,
          // },

          // eslint-disable-next-line react/no-unstable-nested-components
          header: (props) =>
            <MainAppHeader
              {...props}
              hideAppIcon
              title="Notificaciones"
              titleType="text"
              // hideLeftIcon
              // hideRightIcon
              // showBackIcon={true}
              rightIconType="none"
              leftIconType="back"
              onPressLeftButton={() => {
                if (props.navigation.canGoBack()) {
                  props.navigation.goBack();
                }
              }}
              // onPressMenu={() => props.navigation.dispatch(DrawerActions.openDrawer())}
            />,
        }}
      />
    </Stack.Navigator>
  );
};

export default NotificationsStack;
