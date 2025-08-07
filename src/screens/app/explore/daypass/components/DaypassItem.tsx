import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';

import DaypassDetailModal from './DaypassDetailModal';
import { hotelActions } from '@app/store/slices/hotels';
import TextComponent from '@app/components/atoms/text/TextComponent';

import { normalizePixelSize } from '@app/utils/normalize';
import { servicesIconsIndex } from '@app/utils/icons.util';
import { formatToCurrency } from '@app/utils/number.util';
import { chevron_right } from '@app/utils/images';

import { colors } from '@app/theme';
import { IHotelVanueTicket, IPurchaseTicketDetail } from '@app/types';

type Props = {
  // venueService: VenueServDetail;
  venueTicket: IHotelVanueTicket;
  onPress?: (item: IHotelVanueTicket) => void;
  isAdded?: boolean;
}

const DaypassItem = (props: Props) => {
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [purchasedTicket, setPurchasedTicket] = useState<IPurchaseTicketDetail | null>(null);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { purchaseTickets } = useAppSelector(state => state.hotels);
  const {currencySelected} = useAppSelector(state => state.general);

  useFocusEffect(
    useCallback(
      () => {
        const p = purchaseTickets.find(ticket => ticket.id_venue_ticket === props.venueTicket.id_venue_ticket);
        if (p) {
          setPurchasedTicket(p);
        } else {
          setPurchasedTicket(null);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [purchaseTickets],
    )
  );

  function renderAvailability() {
    if (purchasedTicket) {
      return (
        <View style={styles.availavilityContent}>
          <TextComponent size="12" color="white">
            {t('added')}
          </TextComponent>
        </View>
      );
    }

    if (props.venueTicket.ticket_left < 10) {
      return (
        <View style={styles.availavilityContent_limited}>
          <TextComponent size="12" color="yellow">
            {t('only_left', { count: props.venueTicket.ticket_left })}
          </TextComponent>
        </View>
      );
    }

    return <></>;
  }

  const handleOnPress = () => {
    dispatch(hotelActions.sethotelVenueTicketSelected(props.venueTicket));
    setShowDetailModal(true);
  };

  const isUnnavailable = props.venueTicket.ticket_left < 1;

  const ServiceIcon = servicesIconsIndex[props.venueTicket.id_venue_ticket] || servicesIconsIndex['1'];

  return (
    <Pressable onPress={handleOnPress} disabled={isUnnavailable}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={[styles.mainContent, styles.mainContentText]}>
            <ServiceIcon style={styles.mainIcon} />

            <TextComponent size="14" color="dark" numberOfLines={2}>
              {props.venueTicket.name}
            </TextComponent>
          </View>

          <View style={styles.mainContent}>
            <TextComponent size="14" color="dark">
              {`${currencySelected.symbol}${formatToCurrency(props.venueTicket.adult_fare)}`}
            </TextComponent>

            <View style={styles.righIcon}>
              <Image source={chevron_right} style={styles.mainIcon} />
            </View>
          </View>
        </View>

        <View style={styles.availavilityContainer}>{renderAvailability()}</View>

        {purchasedTicket && (
          <View style={styles.selectionDetailsCotainer}>
            <View style={styles.selectionDetailsHeader}>
              <TextComponent size="12" color="primary" weight="bold">
                {t('your_selection')}
              </TextComponent>
            </View>

            <TextComponent size="12" color="dark">
              {`${t('daypass_adults')} `}
              <TextComponent size="12" color="muted">
                {`(${purchasedTicket.adult_number})`}
              </TextComponent>
            </TextComponent>

            <TextComponent size="12" color="dark">
              {`${t('daypass_children')} `}
              <TextComponent size="12" color="muted">
                {`(${purchasedTicket.child_number})`}
              </TextComponent>
            </TextComponent>
          </View>
        )}
      </View>

      {isUnnavailable && <View style={styles.unavailable} />}
      <DaypassDetailModal
        isVisible={showDetailModal}
        ticketLeft={props.venueTicket.ticket_left}
        setIsVisible={setShowDetailModal}
      />
    </Pressable>
  );
};

export default DaypassItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.lowlight,
    borderRadius: 12,
    minHeight: normalizePixelSize(52, 'height'),
    paddingVertical: normalizePixelSize(14, 'height'),
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: normalizePixelSize(12, 'height'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainContentText: {
    flex: 1,
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalizePixelSize(8, 'height'),
  },
  mainIcon: {
    width: normalizePixelSize(20, 'height'),
    height: normalizePixelSize(20, 'height'),
    tintColor: colors.dark,
  },
  righIcon: {
    padding: normalizePixelSize(2, 'height'),
    borderRadius: 20,
    borderColor: colors.lowlight,
    borderWidth: 0.5,
  },
  availavilityContainer: {
    position: 'absolute',
    top: -10,
    right: 10,

  },
  availavilityContent: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  availavilityContent_limited: {
    backgroundColor: colors.yellow_200,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  unavailable: {
    backgroundColor: colors.white_a70,
    position: 'absolute',
    // backgroundColor: 'red',
    // top: -10,
    // right: 10,
    borderRadius: 12,
    // paddingHorizontal: 12,
    // paddingVertical: 10,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  selectionDetailsCotainer: {
    left: normalizePixelSize(38, 'width'),
  },
  selectionDetailsHeader: {
    marginVertical: normalizePixelSize(4, 'height'),
  },
});
