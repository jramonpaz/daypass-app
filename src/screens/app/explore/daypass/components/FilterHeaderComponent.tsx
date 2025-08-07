import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

import HeartIcon from '@app/components/atoms/icons/HeartIcon';
import TextComponent from '@app/components/atoms/text/TextComponent';

import { normalizePixelSize } from '@app/utils/normalize';
import { calendar_outline_icon, chevron_left__white_icon, people_icon, share_icon } from '@app/utils/images';
import { formatDate } from '@app/utils/dates.util';

import { colors } from '@app/theme/colors';
import { gStyles } from '@app/theme';

type Props = {
  onPressBack?: () => void;
  onPressShare?: () => void;
  onPressHeart?: (isActive: boolean) => void;
  onPressDate?: () => void;
  onPressPeople?: () => void;
  selected?: boolean;
  date: Date | undefined;
  peopleCount?: number;
}

const FilterHeaderComponent = (props: Props) => {
  const { t } = useTranslation();
  const [isHeartActive, setIsHeartActive] = React.useState(props.selected || false);

  function handlePressHeart (value: boolean) {
    const newIsActive = value ?? !isHeartActive;
    setIsHeartActive(newIsActive);
    props.onPressHeart && props.onPressHeart(newIsActive);
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.iconRoundContainer, gStyles.shadow_6]}
        onPress={props.onPressBack}
      >
        <Image
          source={chevron_left__white_icon}
          style={styles.backIcon}
        />
      </Pressable>

      <View style={[styles.filterContainer, gStyles.shadow_6]}>
        {!props.date && (
          <Pressable
            style={styles.filterContentItem}
            onPress={props.onPressDate}
          >
            <Image
              source={calendar_outline_icon}
              style={styles.iconActive}
            />
            <TextComponent color="muted" size="14">
              {t('filter-header-when-is-your-trip')}
            </TextComponent>
          </Pressable>
        )}
        {props.date && (
          <>
            <Pressable
              style={styles.filterContentItem}
              onPress={props.onPressDate}
            >
              <Image
                source={calendar_outline_icon}
                style={styles.iconActive}
              />
              <TextComponent color="muted" size="14">
                {formatDate(props.date,'D MMM')}
              </TextComponent>
            </Pressable>

            <Pressable
              style={[styles.filterContentItem, styles.itemRight]}
              onPress={props.onPressPeople}
            >
              <Image
                source={people_icon}
                style={styles.iconActive}
              />

              <TextComponent color="muted" size="14">
                {props.peopleCount}
              </TextComponent>
            </Pressable>
          </>
        )}

      </View>

      <Pressable
        style={[styles.iconRoundContainer, gStyles.shadow_6]}
        onPress={props.onPressShare}
      >
        <Image
          source={share_icon}
          style={styles.backIcon}
        />
      </Pressable>

      <HeartIcon
        containerStyle={[styles.iconRoundContainer, gStyles.shadow_6]}
        isActive={isHeartActive}
        onChange={handlePressHeart}
      />
    </View>
  );
};

export default FilterHeaderComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    gap: 8,
  },
  filterContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    height: normalizePixelSize( 44, 'height'),
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: colors.muted,
    flex: 1,
  },
  filterContentItem: {
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: normalizePixelSize( 12, 'width'),
  },
  iconRoundContainer: {
    backgroundColor: colors.white,
    width: normalizePixelSize( 28),
    height: normalizePixelSize( 28),
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemRight: {
    borderLeftWidth: 0.5,
    borderLeftColor: colors.muted,
    height: normalizePixelSize( 44, 'height'),
  },
  backIcon: {
    tintColor: colors.dark,
    width: normalizePixelSize( 20),
    height: normalizePixelSize( 20),
    resizeMode: 'contain',
  },
  iconActive: {
    tintColor: colors.primary,
    width: normalizePixelSize( 20),
    height: normalizePixelSize( 20),
    resizeMode: 'contain',
  },
});
