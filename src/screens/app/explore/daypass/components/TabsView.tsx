import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import TextComponent from '@app/components/atoms/text/TextComponent';
import { normalizePixelSize } from '@app/utils/normalize';
import { colors } from '@app/theme';

export interface ITabView {
  label: string;
  content: React.ReactNode;
}

type Props = {
  tabs: ITabView[];
  selectedTabIndex: number;
  onTabChange?: (tab: ITabView, index: number) => void;
};

const TabsView = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState(props.selectedTabIndex || 0);
  const [tabSelected, setTabSelected] = useState<React.ReactNode>(props.tabs[0].content);

  const handleChangeTab = (tab: ITabView, index: number) => {
    setSelectedTab(index);
    props.onTabChange && props.onTabChange(tab, index);
    setTabSelected(tab.content);
    props.selectedTabIndex === index && setTabSelected(tab.content);
  };

  return (
    <View>
      <ScrollView
        horizontal={true}
        style={styles.scrollHMain}
        contentContainerStyle={styles.scrollHContent}
        showsHorizontalScrollIndicator={false}
      >
        {props.tabs.map((tab, index) => {
          return (
          <Pressable
            key={index}
            style={[styles.tabButton, selectedTab === index && styles.tabButtonSelected]}
            onPress={() => handleChangeTab(tab, index)}
          >
            <TextComponent
              size="14"
              color={selectedTab === index ? 'primary' : 'dark'}
            >
              {tab.label}
            </TextComponent>
          </Pressable>
          );
        })}
      </ScrollView>
      {tabSelected}
    </View>
  );
};

export default TabsView;

const styles = StyleSheet.create({
  scrollHMain: {
    borderBottomColor: colors.lowlight,
    borderBottomWidth: normalizePixelSize(1, 'height'),
    // borderBottomw
  },
  scrollHContent: {
    paddingHorizontal: normalizePixelSize(20, 'width'),
    gap: normalizePixelSize(12, 'width'),
  },
  tabButton: {
    width: normalizePixelSize(88, 'width'),
    height: normalizePixelSize(50, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
    // bottom: -1,
    // borderWidth: 1,
    // borderColor: 'dark',
    // backgroundColor: colors.black_a40,
  },
  tabButtonSelected: {
    borderBottomColor: colors.primary,
    borderBottomWidth: normalizePixelSize(2, 'height'),
  },
});
