import { Image, StyleSheet, View } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { star_icon } from '@app/utils/images';
import { normalizePixelSize } from '@app/utils/normalize';

import { IHotelVenueReview } from '@app/types';
import { colors } from '@app/theme';

type Props = {
  review: IHotelVenueReview,
};

const ReviewCard = (props: Props) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardProfileContainer}>
        <View style={styles.rowItem}>
          <TextComponent size="16" weight="bold">
            { props.review.name }
          </TextComponent>
          {/* <TextComponent size="12" color="muted">
            { props.review.location }
          </TextComponent> */}
        </View>

        <View style={[styles.rowItem, styles.rowRating]}>
          <View style={styles.leftRaiting}>
            <Image source={star_icon}  style={styles.ratingStarIcon} />
            <TextComponent size="12" color="dark">
              { props.review.rating }
            </TextComponent>
            <TextComponent size="12" color="muted">{ '•' }</TextComponent>
          </View>

          <TextComponent size="12" color="muted" numberOfLines={1}>{ `${ props.review.date_reg}` }</TextComponent>
        </View>
      </View>

      <TextComponent size="14" color="dark">
        {props.review.rev_obs}
      </TextComponent>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  cardContainer: {
    gap: normalizePixelSize(16, 'height'),
  },
  cardProfileContainer: {
    gap: 12,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  cardAvatar: {
    width: normalizePixelSize(42),
    height: normalizePixelSize(42),
    borderRadius: normalizePixelSize(48) / 2,
    resizeMode: 'contain',
    backgroundColor: colors.lowlight,
  },
  rowItem: {
    flexGrow: 1,
  },
  rowRating: {
    width: normalizePixelSize(130),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: normalizePixelSize(4),
    // backgroundColor: 'peru',
  },
  leftRaiting: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: normalizePixelSize(4),
  },
  ratingStarIcon: {
    width: normalizePixelSize(12),
    height: normalizePixelSize(12),
    resizeMode: 'contain',
  },
});
