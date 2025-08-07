import { Image, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';
import HeartIcon from '@app/components/atoms/icons/HeartIcon';

import { star_icon, map_point_outline_icon } from '@app/utils/images';
// import { IHotel } from '../../explore/welcome/HotelListItem';

import { colors } from '@app/theme';
import { normalizePixelSize } from '@app/utils/normalize';
import { IFavoriteVenue } from '@app/types';

type Props = {
  // data: IHotelVanueDetail;
  data: IFavoriteVenue;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  onChangeFavorite?: (favorite: boolean) => void;
}

const FavourityBookingItem = (props: Props) => {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <View>
        <Image
          source={require('@app/assets/images/hotel-1.png')}
          style={styles.image}
        />

        <View style={styles.favotiteIconContainer}>
          <HeartIcon isActive={true} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.contentHead}>
          <View style={styles.row}>
            <Image source={map_point_outline_icon} style={styles.mapIcon}/>
            <TextComponent size="12" color="muted">
              {props.data.address.split(',')?.at(1)?.trim() ?? ''}
            </TextComponent>
          </View>

          <View style={styles.cardTitle}>
            <TextComponent size="16" numberOfLines={3}>{props.data.name}</TextComponent>
          </View>
        </View>
        <View style={styles.rowDetails}>
          <View style={styles.row}>
            <Image source={star_icon} style={styles.starImage}/>
            <TextComponent color="dark">{props.data.rating}</TextComponent>
            <TextComponent color="muted">{props.data.rating_descp}</TextComponent>
            {/* <TextComponent color="muted">{`• (${props.data.rating})`}</TextComponent> */}
          </View>
        </View>
      </View>

    </Pressable>
  );
};

export default FavourityBookingItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // paddingVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
    gap: 20,
    // width: normalizePixelSize(124, 'width'),
    height: normalizePixelSize(96, 'height'),
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  contentHead: {
    gap: normalizePixelSize(6, 'height'),
  },
  image: {
    width: normalizePixelSize(124, 'width'),
    height: normalizePixelSize(96, 'height'),
    borderRadius: 8,
    resizeMode: 'cover',
  },
  favotiteIconContainer: {
    // backgroundColor: colors.white,
    // padding: 4,
    // borderRadius: 40,
    position: 'absolute',
    top: 4,
    right: 4,
  },
  favoriteIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.red,
  },
  favoriteIconDisabled: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.dark,
  },
  cardTitle: {
    marginTop: 4,
    marginBottom: 8,
  },
  starImage: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  mapIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: colors.muted,
    marginTop: 2,
  },
  rowDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
});
