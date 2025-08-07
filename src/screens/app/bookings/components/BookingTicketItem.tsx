import { StyleSheet, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import TextComponent from '@app/components/atoms/text/TextComponent';
import CheckboxComponent from '@app/components/molecules/checks/CheckboxComponent';
import StatusComponent from '@app/components/molecules/checks/StatusComponent';

import { normalizePixelSize } from '@app/utils/normalize';

import { colors } from '@app/theme';
import { IDetailCheckin } from '@app/types';

type Props = {
  isSelected?: boolean,
  ticket: IDetailCheckin
  onSelect?: (ticket: IDetailCheckin, select: boolean) => void;
}

const BookingTicketItem = (props: Props) => {
  const { t } = useTranslation();
  const [isSelected, setIsSelected] = useState(props.isSelected || false);
  const [statusLabel, setStatusLabel] = useState('');

  const statusType = useMemo(() => {
    const val = props.ticket.status;
    // 0 = Pendiente, 1 = Checkin, 2 = Cancelado
    if (val === 1) {
      setStatusLabel(t('booking_ticket_item_checkin'));
      return 'checkin';
    }
    if (val === 2) {
      setStatusLabel(t('booking_ticket_item_cancelled'));
      return 'cancelled';
    }
    setStatusLabel(t('booking_ticket_item_pending'));
    return 'pending';
  }, [props.ticket.status, t]);

  const isDisabled = statusType !== 'pending';

  function handleOnToggleSelect(value: boolean) {
    setIsSelected(value);
    props.onSelect && props.onSelect(props.ticket, value);
  }

  const abbreviateToken = (token: string): string => {
    if (token.length <= 8) {
      return token;
    }
    return `${token.slice(0, 4)}...${token.slice(-4)}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <CheckboxComponent
          isActive={isSelected}
          disabled={isDisabled}
          onChange={handleOnToggleSelect}
        />
      </View>

      <View style={styles.rowSB}>
        <View>
          <TextComponent size="14" weight="semibold" color="dark">
            {props.ticket.name_ticket}
          </TextComponent>
          <TextComponent size="14" color="muted">
            {props.ticket.is_child
              ? t('booking_ticket_item_children')
              : t('booking_ticket_item_adults')}
          </TextComponent>
          <StatusComponent
            type={
              statusType === 'checkin'
                ? 'success'
                : statusType === 'pending'
                  ? 'pending'
                  : 'abort'
            }
            label={statusLabel}
          />
        </View>
        <TextComponent size="14" color="muted">
          {abbreviateToken(props.ticket.token_control)}
        </TextComponent>
      </View>

      {isDisabled && <View style={styles.disabled} />}
    </View>
  );
};

export default BookingTicketItem;

// type StatusTicketType = 'cancelled' | 'checkin' | 'pending';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent:'space-between',
    paddingVertical: normalizePixelSize(12, 'height'),
    gap: 12,
    flexShrink: 1,
    minHeight: normalizePixelSize(100, 'height'),
  },
  rowSB: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'flex-start',
  },
  leftContent: {
    marginTop: 4,
  },
  rightContent: {},
  disabled: {
    position: 'absolute',
    backgroundColor: colors.white_a40,
    top: 10,
    width: '100%',
    height: '100%',
  },
});
