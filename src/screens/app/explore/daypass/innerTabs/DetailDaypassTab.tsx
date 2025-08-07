import { StyleSheet, View } from 'react-native';
import React from 'react';

import { useAppSelector } from '@app/hooks/redux.hook';

import DaypassItem from '../components/DaypassItem';

import { normalizePixelSize } from '@app/utils/normalize';


const DetailDaypassTab = () => {

  const { hotelVenueTickets } = useAppSelector(state  => state.hotels);

  return (
    <View style={styles.container}>
      {hotelVenueTickets.map((service, index) => (
        <DaypassItem
          key={`${index}-${service.id_venue_ticket}-${service.name}`}
          venueTicket={service}
        />
      ))}
    </View>
  );
};

export default DetailDaypassTab;

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalizePixelSize(48, 'height'),
    paddingHorizontal: normalizePixelSize(20, 'width'),
    gap: normalizePixelSize(16, 'height'),
  },
});
