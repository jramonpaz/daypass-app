import MapView, { Marker, Region } from 'react-native-maps';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import React from 'react';

import { useAppSelector } from '@app/hooks/redux.hook';

import TextComponent from '@app/components/atoms/text/TextComponent';
import SectionItems from '@app/components/molecules/SectionItems';
import LabelWithIcon from '@app/components/molecules/LabelWithIcon';

import { normalizePixelSize } from '@app/utils/normalize';

import { map_point_outline_icon } from '@app/utils/images';
import { calculateAspectRatio } from '@app/utils/aspectRatio';
import { servicesIconsIndex } from '@app/utils/icons.util';

import { daypass_detail } from '@app/assets/data/daypass-detail';
import { colors } from '@app/theme/colors';
import { useTranslation } from 'react-i18next';
import MapMarkerComponenent from '@app/components/organisms/MapMarkerComponenent';

// Arganzuela, 28045 Madrid, España
// 40.390893, -3.691122
const DetailInformationTab = () => {
  const { hotel } = daypass_detail;

  const { t } = useTranslation();
  const {hotelVenueDetail, hotelSelected} = useAppSelector(state => state.hotels);
  const {currencySelected} = useAppSelector(state => state.general);

  const mapRegion: Region = {
    latitude: hotelVenueDetail?.lat ?? 37.78825,
    longitude: hotelVenueDetail?.lng ?? -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const cleanDescText = hotelVenueDetail?.descp.replace(/<br\s*\/?>/gi, '\n') ?? '';

  return (
    <View style={styles.content}>
      <TextComponent size="14">{cleanDescText}</TextComponent>

      <SectionItems title={t('what_this_place_offers')}>
        {hotelSelected?.services.map((service, index) => {
          const CID = service.id + '';
          const IconComponent = servicesIconsIndex[CID] ?? servicesIconsIndex['1'];

          return (
            <LabelWithIcon
              label={service.es}
              key={`${index}-${service.id}`}
              iconComponent={<IconComponent fill={colors.muted} />}
            />
          );
        })}
      </SectionItems>

      <SectionItems title={t('daypass_details')}>
        {hotel.daypass_details.map((detail, index) => {
          return (
            <LabelWithIcon
              key={`${index}-${detail}`}
              iconComponent={<TextComponent>•</TextComponent>}
              label={detail}
              style={styles.itemLabel}
            />
          );
        })}
      </SectionItems>

      <SectionItems title={t('location')}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.mapView}
            region={mapRegion}
          >
            <Marker
              coordinate={{
                latitude: hotelVenueDetail?.lat ?? 37.78825,
                longitude: hotelVenueDetail?.lng ?? -122.4324,
              }}
            >
              <MapMarkerComponenent
                size={64}
                isSelected={true}
                label={`${currencySelected.symbol}${200}`}
              />
            </Marker>
          </MapView>
        </View>

        <View style={styles.addressContainer}>
          <Image source={map_point_outline_icon} style={styles.addressIcon} />
          <TextComponent size="14">{hotelVenueDetail?.address}</TextComponent>
        </View>
      </SectionItems>
    </View>
  );

};

export default DetailInformationTab;

const SCREEN_WIDTH = Dimensions.get('screen').width;
const PADDING_HORIZONTAL = normalizePixelSize(20, 'width');
const RATIO_4_3 = calculateAspectRatio(SCREEN_WIDTH - (PADDING_HORIZONTAL * 2));

const styles = StyleSheet.create({
  content: {
    // flex: 1,
    paddingVertical: normalizePixelSize(48, 'height'),
    paddingHorizontal: PADDING_HORIZONTAL,
    gap:  normalizePixelSize(48, 'height'),
    backgroundColor: colors.white,
  },
  itemLabel: {
    alignItems: 'flex-start',
    // backgroundColor: 'red',
    gap: 8,
  },
  mapContainer: {
    height: RATIO_4_3.height,
    width: RATIO_4_3.width,
    // justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.black_a40,
    borderRadius: 18,
    overflow: 'hidden',
  },
  mapView: {
    height: RATIO_4_3.height,
    width: RATIO_4_3.width,
    // justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.black_a40,
    borderRadius: 18,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  addressIcon: {
    width: 20,
    height: 20,
    tintColor: colors.primary,
  },
});
