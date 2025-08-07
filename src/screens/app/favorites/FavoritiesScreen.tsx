import { Alert, FlatList, ListRenderItem, RefreshControl, StatusBar, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { getFavoriteVenues, hotelActions } from '@app/store/slices/hotels';

import FavourityBookingItem from './components/FavourityBookingItem';
import TextComponent from '@app/components/atoms/text/TextComponent';

import { normalizePixelSize } from '@app/utils/normalize';

import { IFavoriteVenue, IGetVenueDetailsRequest } from '@app/types';
import { colors } from '@app/theme';

const FavoritiesScreen = () => {
  const { t } = useTranslation();
  const { favoriteVenues, isLoading, error } = useAppSelector(state => state.hotels);
  const {language} = useAppSelector(state => state.general);

  const dispatch = useAppDispatch();

  const loadData = useCallback(() => {
    dispatch(getFavoriteVenues(language));
  }, [dispatch, language]);

  useEffect(() => {
    let isActive = true;
    if (isActive) {
      loadData();
    }
    return () => {
      isActive = false;
    };
  }, [loadData]);

  useFocusEffect(useCallback(() => {
    if (error) {
      Alert.alert(
        t('favorities_screen_error'),
        error,
        [
          {
            text: t('favorities_screen_accept'),
            onPress: () => dispatch(hotelActions.clean()),
          },
        ],
      );
    }
  }, [error, dispatch, t]));

  const handleOnPressFavorites = (item: IFavoriteVenue) => {
    const payload: IGetVenueDetailsRequest = {
      lang: language,
      iso_country: item.iso_country,
      id_venue: item.id_venue,
    };
    // dispatch(viewer_venueGetDetailService(payload));
    // TODO: handle navigation to favorite venue details
  };

  const renderItem: ListRenderItem<IFavoriteVenue> = ({ item, index }) => {
    return (
      <FavourityBookingItem
        data={item}
        key={`${index}-${item.name}`}
        onPress={() => handleOnPressFavorites(item)}
      />
    );
  };

  const renderHeader = () => {
    if (favoriteVenues.length === 0) {
      return null;
    }

    return (
      <View style={styles.header}>
        <TextComponent size="14">
          {t('favorities_screen_saved', { count: favoriteVenues.length })}
        </TextComponent>
      </View>
    );
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <TextComponent size="16" color="muted" textAlign="center">
          {t('favorities_screen_no_hotels_saved')}
        </TextComponent>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={favoriteVenues}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyList}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={loadData}
            colors={[colors.primary, colors.secondary]}
          />
        }
      />
    </View>
  );
};

export default FavoritiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    // paddingHorizontal: normalizePixelSize(20, 'width'),
    // paddingVertical: normalizePixelSize(24, 'height'),
  },
  emptyContainer: {},
  content: {
    flex: 1,
    backgroundColor: colors.white,
    gap: normalizePixelSize(16, 'height'),
    paddingHorizontal: normalizePixelSize(20, 'width'),
    paddingVertical: normalizePixelSize(24, 'height'),
    // alignItems: 'center',
  },
});
