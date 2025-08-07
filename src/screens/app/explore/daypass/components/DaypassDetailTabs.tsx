import { StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import { TabBar, TabView } from 'react-native-tab-view';
import { useTranslation } from 'react-i18next';

import TextComponent from '@app/components/atoms/text/TextComponent';
import DetailReviewsTab from '../innerTabs/DetailReviewsTab';
import DetailPolicesTab from '../innerTabs/DetailPolicesTab';
import DetailDaypassTab from '../innerTabs/DetailDaypassTab';
import DetailInformationTab from '../innerTabs/DetailInformationTab';

import { normalizeFontSize } from '@app/utils/normalize';

import { colors } from '@app/theme/colors';

const DaypassDetailTabs = () => {
  const layout = useWindowDimensions();
  const { t } = useTranslation();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'daypass', title: t('daypass-detail-tabs-daypass') },
    { key: 'information', title: t('daypass-detail-tabs-information') },
    { key: 'reviews', title: t('daypass-detail-tabs-reviews') },
    { key: 'policies', title: t('daypass-detail-tabs-policies') },
  ]);


  return (
    <TabView
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      lazy={true}
      lazyPreloadDistance={1} // Cargar solo el siguiente tab
      renderScene={({ route }) => {
        switch (route.key) {
          case 'daypass':
            return <DetailDaypassTab />;
          case 'information':
            return <DetailInformationTab />;
          case 'reviews':
            return <DetailReviewsTab />;
          case 'policies':
            return <DetailPolicesTab />;
          default:
            return null;
        }
      }}
      renderTabBar={props => (
        <TabBar
          {...props}
          style={styles.tabBar}
          labelStyle={styles.tabLabel}
          indicatorStyle={styles.indicator}
          renderLabel={({ focused, route }) => (
            <TextComponent size="14" color={focused ? 'primary' : 'muted'}>
              {route.title}
            </TextComponent>
          )}
        />
      )}
    />
  );
};

export default DaypassDetailTabs;

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
