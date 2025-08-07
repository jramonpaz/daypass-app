import { StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import { TabBar, TabView } from 'react-native-tab-view';
import { useTranslation } from 'react-i18next';
// import { NavigationProp, useNavigation } from '@react-navigation/native';

// import { BookingsTabStackParamList } from '@app/navigation/BookingsTabStack';

import PreviousBookingsTab from '../innerTabs/PreiousBookingsTab';
// import CanceledBookingsTab from '../innerTabs/CanceledBookingsTab';
import CurrentBookingsTab from '../innerTabs/CurrentBookingsTab';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { normalizeFontSize, normalizePixelSize } from '@app/utils/normalize';

import { colors } from '@app/theme';

const BookingsTabView = () => {
  const { t } = useTranslation();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'current', title: t('active') },
    { key: 'previous', title: t('past') },
    // { key: 'canceled', title: t('canceled') }, // TODO: add transition
  ]);


  return (
    <TabView
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      lazy={true}
      lazyPreloadDistance={1} // Cargar solo el siguiente tab
      renderScene={({ route  }) => {
        switch (route.key) {
          case 'current':
            return <CurrentBookingsTab key={route.key} />;
          case 'previous':
            return <PreviousBookingsTab key={route.key} />;
          // case 'canceled':
          //   return <CanceledBookingsTab />;
          default:
            return null;
        }
      }}
      renderTabBar={tabProps => (
        <TabBar
          {...tabProps}
          style={styles.tabBar}
          labelStyle={styles.tabLabel}
          indicatorStyle={styles.indicator}
          renderLabel={({ focused, route }) => (
            <TextComponent size="14" color={focused ? 'primary' : 'muted'} key={route.key}>
                {route.title}
              </TextComponent>
            )}
        />
      )}
    />
  );
};

export default BookingsTabView;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabBar: {
    backgroundColor: 'white',
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.lowlight,
    marginHorizontal: normalizePixelSize(10, 'width'),
  },
  indicator: {
    backgroundColor: colors.primary,
    height: 2,
  },
  tabLabel: {
    color: colors.muted,
    textTransform: 'none',
    fontSize: normalizeFontSize(14),
  },
  tabBarContainer: {
    // paddingHorizontal: 10,
    // flex: 1,
  },
});
