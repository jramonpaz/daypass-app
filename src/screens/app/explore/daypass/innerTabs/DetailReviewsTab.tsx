import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';

import TextComponent from '@app/components/atoms/text/TextComponent';
import ReviewCard from '../components/ReviewCard';
import SelectDropdownComponent from '@app/components/organisms/selects/SelectDropdownComponent';

import { normalizePixelSize } from '@app/utils/normalize';

import { colors } from '@app/theme';
import { IGetVenueReviewsRequest } from '@app/types';
import { hotelActions, viewer_venueGetReviewsService } from '@app/store/slices/hotels';

const DetailReviewsTab = () => {
  const { t } = useTranslation();
  const filterData: string[] = [
    t('review_date'),
    t('review_most_relevant'),
    t('review_least_relevant'),
  ]; // 0 Fecha, 1 Más relevante, 2 Menos relevante


  const {hotelVenieReviews, hotelVenieReviewsCount, hotelVieweReviewsRequest, isLoading} = useAppSelector(state => state.hotels);
  const dispatch = useAppDispatch();

  const handleChangeSorted = (item: any, index: number) => {
    if (hotelVieweReviewsRequest) {
      const nextPage: IGetVenueReviewsRequest = {
        ...hotelVieweReviewsRequest,
        pagenumber: 1,
        orderby: index,
        rowspage: hotelVieweReviewsRequest.rowspage,
      };
      dispatch(hotelActions.setHotelVenueReviews([]));
      dispatch(viewer_venueGetReviewsService(nextPage));
    }
  };

  function handleLoadMore () {
    if (hotelVieweReviewsRequest) {
      const nextPage: IGetVenueReviewsRequest = {
        ...hotelVieweReviewsRequest,
        pagenumber: hotelVieweReviewsRequest.pagenumber + 1,
        rowspage: hotelVieweReviewsRequest.rowspage,
      };
      dispatch(viewer_venueGetReviewsService(nextPage));
    }
  }

  return (
    <View style={styles.content}>
      <View style={styles.head}>
        <TextComponent weight="bold" size="18">{`${hotelVenieReviewsCount} ${t('reviews')}`}</TextComponent>
        <SelectDropdownComponent data={filterData} label={filterData[1]} onChange={handleChangeSorted} />
      </View>

      {isLoading && <ActivityIndicator size={24} />}

      {!isLoading && hotelVenieReviews.length === 0 && (
        <View style={styles.emptyContainer}>
          <TextComponent size="18" weight="bold">{t('no_reviews')}</TextComponent>
        </View>
      )}

      <View style={styles.reviewContent}>
        {hotelVenieReviews.map((review, index) => (
          <ReviewCard review={review} key={index} />
        ))}
      </View>

      {hotelVieweReviewsRequest &&
        hotelVenieReviewsCount > hotelVieweReviewsRequest.rowspage * hotelVieweReviewsRequest.pagenumber && (
          <View style={styles.loadMoreContainer}>
            {isLoading ? (
              <ActivityIndicator size={24} />
            ) : (
              <TextComponent
                weight="bold"
                size="14"
                underline
                color="muted"
                textAlign="center"
                onPress={handleLoadMore}
              >
                {t('load_more')}
              </TextComponent>
            )}
          </View>
        )}
    </View>
  );
};

export default DetailReviewsTab;

const styles = StyleSheet.create({
  content: {
    paddingVertical: normalizePixelSize(48, 'height'),
    paddingHorizontal: normalizePixelSize(20, 'width'),
    gap:  normalizePixelSize(24, 'height'),
    backgroundColor: colors.white,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewContent: {
    gap: normalizePixelSize(32, 'height'),
  },
  loadMoreContainer: {
    marginTop: 20,
  },
  emptyContainer: {
    marginTop: 30,
    alignItems: 'center',
    height: 100,
  },
});
