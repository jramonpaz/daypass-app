import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '@app/hooks/redux.hook';
import { hotelActions } from '@app/store/slices/hotels';

import TextComponent from '@app/components/atoms/text/TextComponent';
import ReservationDataItem from './ReservationDataItem';

import { normalizePixelSize } from '@app/utils/normalize';
import { formatToCurrency } from '@app/utils/number.util';

import { IPurchaseTicketDetail } from '@app/types';

type Props = {
  purchaseTickets: IPurchaseTicketDetail[],
  purchaseTaxes: number,
  totalPurchaseAmount: number,
}

const ReservationDetail = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  function calcTotal(ticket: IPurchaseTicketDetail) {
    const total =
      ticket.adult_number * ticket.adult_unity_price +
      ticket.child_number * ticket.child_unity_price;
    return total;
  }

  function calcTotalAmount() {
    return props.purchaseTickets.reduce(
      (acc, ticket) => acc + calcTotal(ticket),
      0 + props.purchaseTaxes
    );
  }

  function hanldeDeleteTicket(ticket: IPurchaseTicketDetail) {
    dispatch(hotelActions.removePurchaseTickets(ticket));
  }

  return (
    <View style={styles.container}>
      {props.purchaseTickets.map((ticket, index) => (
        <ReservationDataItem
          key={index}
          title={ticket.ticketName}
          date={new Date()}
          price={calcTotal(ticket)}
          childrens={ticket.child_number}
          adults={ticket.adult_number}
          onPressDelete={() => hanldeDeleteTicket(ticket)}
        />
      ))}

      <View style={styles.subSection}>
        <View style={styles.rowSpaceBetween}>
          <TextComponent size="16" color="dark">
            {t('reservation-detail-tax')}
          </TextComponent>
          <TextComponent size="16" color="dark">
            {`$${formatToCurrency(props.purchaseTaxes)}`}
          </TextComponent>
        </View>

        <View style={styles.rowSpaceBetween}>
          <TextComponent size="16" color="dark" weight="bold">
            {t('reservation-detail-total')}
          </TextComponent>
          <TextComponent size="16" color="dark" weight="bold">
            {`$${formatToCurrency(props.totalPurchaseAmount ?? calcTotalAmount())}`}
          </TextComponent>
        </View>
      </View>
    </View>
  );
};

export default ReservationDetail;

const styles = StyleSheet.create({
  container: {
    gap: normalizePixelSize(20, 'height'),
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subSection: {
    gap: normalizePixelSize(12, 'height'),
  },
});
