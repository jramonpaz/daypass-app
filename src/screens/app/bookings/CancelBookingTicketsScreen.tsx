import { Alert, Image, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';

import { BookingsTabStackParamList } from '@app/navigation/BookingsTabStack';

import { cancelTicketsOfPurchase } from '@app/store/slices/bookings/bookings.service';
import { purchasesActions } from '@app/store/slices/bookings/bokkings.slice';

import DivisorComponent from '@app/components/molecules/divisor/DivisorComponent';
import ButtonComponent from '@app/components/molecules/buttons/ButtonComponent';
import TextComponent from '@app/components/atoms/text/TextComponent';
import BookingTicketItem from './components/BookingTicketItem';

import { x_close_icon } from '@app/utils/images';
import { normalizePixelSize } from '@app/utils/normalize';

import { colors } from '@app/theme';
import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { ICancelTicketRequet, IDetailCheckin } from '@app/types';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: NavigationProp<BookingsTabStackParamList>,
};

const CancelBookingTicketsScreen = (props: Props) => {
  const { t } = useTranslation();
  const [selectedTicket, setSelectedTicket] = useState<IDetailCheckin[]>([]);

  const dispatch = useAppDispatch();
  const { bookingPurchaseSelected, error, isLoading } = useAppSelector(state => state.purchases);

  function handleSelectOneTicket (ticket: IDetailCheckin, isForAdd: boolean) {
    if (isForAdd) {
      const newSelectedTickets = [...selectedTicket, ticket];
      setSelectedTicket(newSelectedTickets);
    } else {
      const newSelectedTickets = selectedTicket.filter(tk => tk.token_control !== ticket.token_control);
      setSelectedTicket(newSelectedTickets);
    }
  }

  function handleGoBack () {
    props.navigation.goBack();
  }

  const handleSubmit = async () => {
    if (bookingPurchaseSelected) {
      const payload: ICancelTicketRequet = {
        id_purch: bookingPurchaseSelected.id_purch,
        tickets: selectedTicket.map(tk => ({
          line_purch: tk.line_purch,
          line: tk.line,
        })),
      };
      dispatch(cancelTicketsOfPurchase(payload));
    }
  };

  useFocusEffect(
    useCallback(
      () => {
        if (error) {
          Alert.alert(
            t('cancel_booking_tickets_error'),
            error,
            [
              {
                text: t('cancel_booking_tickets_accept'),
                style: 'default',
                onPress: () => {
                  dispatch(purchasesActions.clean());
                },
              },
            ],
          );
        }
      },
      [error, dispatch, t],
    )
  );

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Pressable onPress={handleGoBack}>
          <Image source={x_close_icon} style={styles.closeIcon} />
        </Pressable>
        <TextComponent size="24" weight="bold" color="primary">{t('cancel_booking_tickets_title')}</TextComponent>
      </View>

      <ScrollView
        nestedScrollEnabled
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {bookingPurchaseSelected?.detailCheckin.map((checkin, index) => (
          <View key={`${index}-${checkin.token_control}`}>
            <BookingTicketItem
              ticket={checkin}
              onSelect={handleSelectOneTicket}
            />
            {<DivisorComponent/>}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <ButtonComponent
          isLoading={isLoading}
          title={t('cancel_booking_tickets_submit')}
          style={styles.actionButton}
          disabled={!(selectedTicket.length > 0) || isLoading}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default CancelBookingTicketsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: normalizePixelSize(Platform.OS === 'ios' ? 60 : 30, 'height'),
    paddingBottom:  14,
    gap: 10,
    borderBottomColor: colors.lowlight,
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
    paddingHorizontal: normalizePixelSize( 20),
    // paddingLeft: 20,
    paddingVertical: 20,
  },
  scrollContent: {
    paddingBottom: normalizePixelSize(60, 'height'),
  },
  footer: {
    // flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: normalizePixelSize(20),
    paddingTop: normalizePixelSize(8, 'height'),
    paddingBottom: normalizePixelSize(Platform.OS === 'ios' ? 34 : 24, 'height'),
    gap: 30,
    borderBottomColor: colors.muted,
    borderBottomWidth: 1,
    width: '100%',
    borderTopColor: colors.lowlight,
    borderTopWidth: 1,
  },
  actionButton: {
    // height: 40,
    // paddingVertical: 5,
  },
});
