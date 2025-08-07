import { Image, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { normalizePixelSize } from '@app/utils/normalize';

import { map_point_outline_icon, star_icon, x_close_icon } from '@app/utils/images';

import { colors, gStyles } from '@app/theme';
import { IHotelListItem } from '@app/types';

type Props = {
  // data: IHotelVanueDetail;
  data: IHotelListItem;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  onClose?: () => void;
  // onChangeFavorite?: (favorite: boolean) => void;
}

const BookingMapSelected = (props: Props) => {
  return (
    <Pressable style={[styles.container, gStyles.shadow_8]} onPress={props.onPress}>
      <View>
        <Image
          source={require('@app/assets/images/hotel-1.png')}
          style={styles.image}
        />

        <Pressable style={styles.closeIconContainer} onPress={props.onClose}>
          <Image source={x_close_icon} style={styles.closeIcon}/>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.contentHead}>
          {!!props.data.locationCity && (<View style={styles.row}>
            <Image source={map_point_outline_icon} style={styles.mapIcon}/>
            <TextComponent size="12" color="muted" numberOfLines={1}>
              {props.data.locationCity}
            </TextComponent>
          </View>)}

          <View style={styles.cardTitle}>
            <TextComponent size="16" numberOfLines={3}>{props.data.name}</TextComponent>
          </View>
        </View>
        <View style={styles.rowDetails}>
          <View style={styles.row}>
            <Image source={star_icon} style={styles.starImage}/>
            <TextComponent color="dark">{props.data.stars}</TextComponent>
            <TextComponent color="muted">{props.data.rating_descp}</TextComponent>
            {/* <TextComponent color="muted">{`• (${props.data.rating})`}</TextComponent> */}
          </View>
        </View>
      </View>

    </Pressable>
  );
};

export default BookingMapSelected;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // paddingVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
    gap: 20,
    // width: normalizePixelSize(124, 'width'),
    height: normalizePixelSize(96, 'height'),
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    // justifyContent: 'space-between',
    justifyContent: 'space-evenly',
    paddingVertical: 8,
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
  closeIconContainer: {
    backgroundColor: colors.white,
    width: normalizePixelSize(28, 'width'),
    height: normalizePixelSize(28, 'width'),
    borderRadius: 28,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 4,
    left: 4,
  },
  closeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.dark,
    // top: 4,
    // right: 4,
  },
});
