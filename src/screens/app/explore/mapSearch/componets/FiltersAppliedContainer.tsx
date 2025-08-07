import { ScrollView, StyleSheet} from 'react-native';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { exploreActions } from '@app/store/slices/explore/explore.slice';

import FilterAppliedItem from './FilterAppliedItem';

import { normalizePixelSize } from '@app/utils/normalize';

type FiltersAppliedContainerProps = {
  onChangeSomeFilter: () => void;
};

const FiltersAppliedContainer = (props: FiltersAppliedContainerProps) => {
  const {t} = useTranslation();

  const dispatch = useAppDispatch();
  const {ticketsMoodList, vibesList, priceRange, defaultPriceRange, hotelStarTypes} = useAppSelector(state => state.explore);
  const { currencySelected } = useAppSelector(state => state.general);

  const priceRangeFilter = useMemo(() => {
    if (priceRange.length === 2) {
      if (priceRange[0] !== defaultPriceRange[0] || priceRange[1] !== defaultPriceRange[1]) {
        return `${priceRange[0]}${currencySelected.symbol} - ${priceRange[1]}${currencySelected.symbol}`;
      }
    }

    return null;
  }, [priceRange, defaultPriceRange, currencySelected]);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {priceRangeFilter && (
        <FilterAppliedItem
          title={priceRangeFilter}
          onPress={() => {
            dispatch(exploreActions.cleanSelectedPriceRange());
            props.onChangeSomeFilter();
          }}
        />
      )}

      {hotelStarTypes.map((type, index) => (
        <FilterAppliedItem
          key={index}
          title={t('star_rating', {rating: type})}
          onPress={() => {
            dispatch(exploreActions.removeSelectedHotelStarType(type));
            props.onChangeSomeFilter();
          }}
        />
      ))}

      {vibesList.map(vibe => {
        if (vibe.isSelected) {
          return (
            <FilterAppliedItem
              key={vibe.id_vibe}
              title={vibe.name}
              onPress={() => {
                dispatch(exploreActions.selectOneVibe({vibe, active: false}));
                props.onChangeSomeFilter();
              }}
            />
          );
        }
        return null;
      })}

      {ticketsMoodList.map(mood => {
        if (mood.isSelected) {
          return (
            <FilterAppliedItem
              key={mood.id_ticket_type}
              title={mood.name}
              onPress={() => {
                dispatch(exploreActions.selectOneTicketMood({mood, active: false}));
                props.onChangeSomeFilter();
              }}
            />
          );
        }
        return null;
      })}
    </ScrollView>
  );
};

export default FiltersAppliedContainer;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: normalizePixelSize(20, 'width'),
    gap: normalizePixelSize(8, 'width'),
  },
});
