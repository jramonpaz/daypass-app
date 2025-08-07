import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { searchActions } from '@app/store/slices/search/search.slice';
import {
  general_getAllTicketTypeService,
  general_getAllVibeService,
  general_searchGeneral,
  general_searchGeneralCount,
} from '@app/store/slices/explore/explore.service';
import { exploreActions } from '@app/store/slices/explore/explore.slice';

import BaseModalFullFill from '@app/components/molecules/modals/BaseModalFullFill';
import MultiSliderSelect from '@app/components/organisms/selects/MultiSliderSelect';
import ButtonComponent from '@app/components/molecules/buttons/ButtonComponent';
import SectionItems from '@app/components/molecules/SectionItems';
import TextComponent from '@app/components/atoms/text/TextComponent';
import CheckboxLabel from '@app/components/molecules/checks/CheckboxLabel';
import MultiSelectListH from './MultiSelectListH';

import { normalizePixelSize } from '@app/utils/normalize';
import { x_close_icon } from '@app/utils/images';
import { colors } from '@app/theme/colors';
import { IAPIExplorerSearch, IMoodFilter, IVibesFilter } from '@app/types';
import { useTranslation } from 'react-i18next';

type HomeFilterModalProps = PropsWithChildren & {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const HomeFilterModal = (props: HomeFilterModalProps) => {
  const [getMinMaxFilter, setGetMinMaxFilter] = useState(true);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const {ticketsMoodList, vibesList, priceRange, defaultPriceRange, hotelStarTypes, hasChangedFilters} = useAppSelector(state => state.explore);
  const {searchFilterData, searchFilterDataBackup, searchSelectedPrediction} = useAppSelector(state => state.search);
  const { hotelGeneralCount, isLoading, hotelsList } = useAppSelector(state => state.hotels);

  useEffect(() => {
    let isActive = true;

    if (isActive) {
      let count = 0;

      count += hotelStarTypes.length;
      count += vibesList.filter(vibe => vibe.isSelected).length;
      count += ticketsMoodList.filter(mood => mood.isSelected).length;

      if (priceRange[0] !== defaultPriceRange[0] || priceRange[1] !== defaultPriceRange[1]) {
        count += 1;
      }

      dispatch(exploreActions.setFiltersCount(count));
    }

    return () => {
      isActive = false;
    };
  }, [ticketsMoodList, vibesList, hotelStarTypes, defaultPriceRange, priceRange, dispatch]);

  useFocusEffect(
    useCallback(
       () => {
        if (ticketsMoodList.length === 0) {
          dispatch(general_getAllTicketTypeService());
        }

        if (vibesList.length === 0) {
          dispatch(general_getAllVibeService());
        }
      },
      [dispatch, ticketsMoodList, vibesList],
    )
  );

  function handleSelectTicketMood (mood: IMoodFilter, value: boolean) {
    dispatch(exploreActions.selectOneTicketMood({mood, active: value}));
    // refreshCountData();
    setGetMinMaxFilter(true);
  }

  function handleSelectVibes (vibe: IVibesFilter, value: boolean) {
    dispatch(exploreActions.selectOneVibe({vibe, active: value}));
    // refreshCountData();
    setGetMinMaxFilter(true);
  }

  function handleRangeValuesChanged (values: number[]) {
    dispatch(exploreActions.setPriceRange(values));
  }

  function handleRangeValuesChangedFinished (values: number[]) {
    dispatch(exploreActions.setPriceRange(values));
    // refreshCountData();
    setGetMinMaxFilter(false);
    refreshCountData(false);
  }

  function handleChangeHotelType (data: string[]) {
    dispatch(exploreActions.setSelectedHotelStarTypes(data));
    // refreshCountData();
    setGetMinMaxFilter(true);
  }

  function handleCleanAll () {
    dispatch(exploreActions.cleanAllSelectedVibes());
    dispatch(exploreActions.cleanAllSelectedTicketMoods());
    dispatch(exploreActions.cleanSelectedPriceRange());
    dispatch(exploreActions.cleanSelectedHotelStars());
    // refreshCountData();
    setGetMinMaxFilter(true);
    dispatch(exploreActions.setHasChangedFilters(false));
  }

  const buildFilterData = (getMinMax: boolean = getMinMaxFilter) :IAPIExplorerSearch | null => {
    if (!searchFilterData || !searchSelectedPrediction) {
      console.error('no have previuos search data');
      return null;
    }
    const selectedMood = ticketsMoodList.filter(mood =>!!mood.isSelected);
    const selecteVibes = vibesList.filter(vibe =>!!vibe.isSelected);
    const hoteltsype = hotelStarTypes.join(',');

    return {
      ...searchFilterData,
      ticket_type: selectedMood ? selectedMood.map(m => m.id_ticket_type).join(',') : '',
      venue_vibes: selecteVibes ? selecteVibes.map(v => v.id_vibe).join(',') : '',
      // ticket_type:  selecteVibes ? selecteVibes.map(v => v.id_vibe).join(',') : '',
      // venue_vibes: selectedMood ? selectedMood.map(m => m.id_ticket_type).join(',') : '',
      price_from: priceRange[0],
      stars: hoteltsype ?? '',
      price_to: priceRange[1],
      getPriceMinMax: getMinMax,
      orderby: 0,
      pagenumber: 1,
      //
      rowspage: searchFilterData?.rowspage ?? 10,
      lang: searchFilterData.lang,
      currency: searchFilterData.currency ?? 'MXN',
      iso_country_pred: searchSelectedPrediction.iso_country,
      id_search_pred: searchSelectedPrediction.id_search,
      date_search: searchFilterData.date_search,
      pax: searchFilterData.pax ?? 1,
      ticket_genserv: '',
    };
  };

  const refreshCountData = async (getMinMax: boolean = getMinMaxFilter) => {
    if (!searchFilterData || !searchSelectedPrediction) {
      // console.error('no have previuos search data');
      return;
    }

    const newApiFilterSearch: IAPIExplorerSearch | null = buildFilterData(getMinMax);

    if (newApiFilterSearch) {
      await dispatch(general_searchGeneralCount(newApiFilterSearch, getMinMax));
    }
  };

  useFocusEffect(useCallback(
    () => {
      refreshCountData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hotelStarTypes, ticketsMoodList, vibesList],
  ));


  const submitFilterSearch = async () => {
    if (!searchFilterData || !searchSelectedPrediction) {
      console.error('no have previuos search data asdada');
      return;
    }

    dispatch(exploreActions.setHasChangedFilters(true));

    const newApiFilterSearch: IAPIExplorerSearch | null = buildFilterData(getMinMaxFilter);

    if (newApiFilterSearch) {
      dispatch(searchActions.setSearchFilterData(newApiFilterSearch));
      dispatch(searchActions.setSearchFilterDataBackup(newApiFilterSearch));
      await dispatch(general_searchGeneral(newApiFilterSearch));
      props.setIsVisible(false);
    }
  };

  const handleCancelFilterData = async () => {
    if (!searchFilterDataBackup) {
      props.setIsVisible(false);
    } else {
      dispatch(searchActions.setSearchFilterData(searchFilterDataBackup));
      // await dispatch(general_searchGeneral(searchFilterDataBackup));
      if (!hasChangedFilters) {
        handleCleanAll();
      }
      props.setIsVisible(false);
    }
  };

  return (
    <BaseModalFullFill {...props}>
      <View style={styles.header}>
        <Pressable onPress={handleCancelFilterData}>
          <Image source={x_close_icon} style={styles.closeIcon} />
        </Pressable>
        <TextComponent size="24" weight="bold" color="primary">
          {t('filter_modal-title')}
        </TextComponent>
      </View>

      <ScrollView
        nestedScrollEnabled
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <TextComponent size="16" weight="bold" textAlign="left">
            {t('filter_modal-hotel_class')}
          </TextComponent>

          <MultiSelectListH
            selects={hotelStarTypes}
            range={['5', '4', '3', '2', '1']}
            onChange={handleChangeHotelType}
          />
        </View>

        <View style={styles.section}>
          <TextComponent size="16" weight="bold" textAlign="left">
            {t('filter_modal-price_range')}
          </TextComponent>

          <MultiSliderSelect
            minValue={defaultPriceRange[0]}
            maxValue={defaultPriceRange[1]}
            selectedValues={priceRange}
            onValuesChange={handleRangeValuesChanged}
            onValuesChangeFinish={handleRangeValuesChangedFinished}
          />
        </View>

        <SectionItems title={t('filter_modal-mood')}>
          {vibesList.map((vibe) => (
            <CheckboxLabel
              label={vibe.name}
              active={!!vibe.isSelected}
              key={`${vibe.id_vibe}-${vibe.name}`}
              onChange={(value: boolean) => handleSelectVibes(vibe, value)}
            />
          ))}
        </SectionItems>

        <SectionItems title={t('filter_modal-ticket_type')}>
          {ticketsMoodList.map((mood) => (
            <CheckboxLabel
              label={mood.name}
              active={!!mood.isSelected}
              key={`${mood.id_ticket_type}-${mood.name}`}
              onChange={(value: boolean) => handleSelectTicketMood(mood, value)}
            />
          ))}
        </SectionItems>
      </ScrollView>

      <View style={styles.footer}>
        <TextComponent
          size="14"
          weight="bold"
          textAlign="left"
          underline
          color="muted"
          onPress={handleCleanAll}
        >
          {t('filter_modal-clear_all')}
        </TextComponent>

        <ButtonComponent
          isLoading={isLoading}
          title={`${t('filter_modal-show')} ${
            hotelGeneralCount > 0 ? hotelGeneralCount : hotelsList.length
          } ${t('filter_modal-results')}`}
          style={styles.actionButton}
          disabled={isLoading}
          onPress={submitFilterSearch}
        />
      </View>
    </BaseModalFullFill>
  );

};

export default HomeFilterModal;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
    gap: 10,
    borderBottomColor: colors.muted,
    borderBottomWidth: 1,
    width: '100%',
  },
  closeIcon: {
    width: 20,
    height: 20,
    tintColor: colors.dark,
  },
  scroll: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
    // paddingLeft: 20,
    paddingVertical: 20,
  },
  scrollContent: {
    paddingBottom: 40,
    // paddingHorizontal: normalizePixelSize(20, 'width'),
    gap: normalizePixelSize(40, 'height'),
  },
  section: {
    width: '100%',
    gap: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'flex-start',
    // backgroundColor: 'red',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,
    gap: 30,
    borderTopColor: colors.lowlight,
    borderTopWidth: 1,
    width: '100%',
  },
  actionButton: {
    height: 40,
    paddingVertical: 5,
    flexGrow: 1,
  },
});
