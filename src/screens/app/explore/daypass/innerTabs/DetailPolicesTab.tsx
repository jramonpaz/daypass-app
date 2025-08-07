import { Image, StyleSheet, View } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { normalizePixelSize } from '@app/utils/normalize';

import { IDaypassPolices } from '@app/types';
import { daypass_polices } from '@app/assets/data/daypass-detail';
import { colors } from '@app/theme';
import { clock_icon, people_icon, prohibited_icon, weather_icon } from '@app/utils/images';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ExploreTabStackParamList } from '@app/navigation/ExploreTabStack';

type NavigationPropType = NavigationProp<ExploreTabStackParamList>;

const DetailPolicesTab = () => {
  const polices = daypass_polices as IDaypassPolices;

  const navigation = useNavigation<NavigationPropType>();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <TextComponent size="18" weight="bold">
          Politica de cancelación
        </TextComponent>
        <TextComponent size="14">
          {polices.cancellation_policy.description}
        </TextComponent>

        <View style={styles.refund}>
          <View style={styles.refundColumn}>
            <TextComponent size="14" weight="bold">Después</TextComponent>
            <View>
              <TextComponent size="14">
                {polices.cancellation_policy.after.date}
              </TextComponent>
              <TextComponent size="14">
                {polices.cancellation_policy.after.time}
              </TextComponent>
            </View>
          </View>

          <View style={styles.refundColumn}>
            <TextComponent size="14" weight="bold">No hay reembolso</TextComponent>
            <TextComponent size="14">
              {polices.cancellation_policy.after.refund}
            </TextComponent>
          </View>
        </View>

        <View style={styles.divisor} />

        <TextComponent size="14">
          {polices.cancellation_policy.cleaning_fee}
          {'\n'}
          <TextComponent
            size="14"
            color="primary"
            underline={true}
            weight="bold"
            // onPress={handleGoToPolices}
          >
            {'Más info sobre las políticas de cancelación'}
          </TextComponent>
        </TextComponent>

      </View>

      <View style={styles.rulesSection}>
        <View style={styles.rulesHeader}>
          <TextComponent size="18" weight="bold">Reglas de casa</TextComponent>
          <TextComponent size="14">{polices.house_rules.description}</TextComponent>
        </View>

        <View style={styles.rulesInnerSection}>
          <TextComponent size="18" weight="bold">Entrada y salida</TextComponent>
          <View style={styles.rowSectionItem}>
            <Image source={clock_icon} style={styles.icon} />
            <View>
              <TextComponent size="14" color="dark">Entrada:</TextComponent>
              <TextComponent size="14" color="muted">A partir de las 10:00 AM</TextComponent>
            </View>
          </View>
        </View>

        <View style={styles.rulesInnerSection}>
          <TextComponent size="18" weight="bold">Durante su estancia</TextComponent>
          <View style={styles.rowSectionItem}>
            <Image source={people_icon} style={styles.icon} />
            <View>
              <TextComponent size="14" color="dark">Máximo 2 personas</TextComponent>
            </View>
          </View>

          <View style={styles.rowSectionItem}>
            <Image source={prohibited_icon} style={styles.icon} />
            <View>
              <TextComponent size="14" color="dark">Sin mascotas</TextComponent>
            </View>
          </View>

          <View style={styles.rowSectionItem}>
            <Image source={weather_icon} style={styles.icon} />
            <View>
              <TextComponent size="14" color="dark">Horas tranquilas</TextComponent>
              <TextComponent size="14" color="muted">12.00 AM - 8:00 AM</TextComponent>
            </View>
          </View>

          <View style={styles.rowSectionItem}>
            <Image source={prohibited_icon} style={styles.icon} />
            <View>
              <TextComponent size="14" color="dark">No hay fiestas ni eventos</TextComponent>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailPolicesTab;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalizePixelSize(20, 'width'),
    paddingVertical: normalizePixelSize(48, 'width'),
    gap: normalizePixelSize(48, 'width'),
  },
  section: {
    gap: normalizePixelSize(20, 'height'),
  },
  refund: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: normalizePixelSize(20, 'width'),
  },
  refundColumn: {
    gap: normalizePixelSize(10, 'height'),
  },
  divisor: {
    height: 1,
    width: '100%',
    backgroundColor: colors.lowlight,
  },
  rulesSection: {
    paddingVertical: normalizePixelSize(24, 'height'),
    gap: normalizePixelSize(24, 'height'),
  },
  rulesHeader: {
    gap: normalizePixelSize(20, 'height'),
  },
  rulesInnerSection: {
    gap: normalizePixelSize(16, 'height'),
  },
  rowSectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: normalizePixelSize(12, 'width'),
  },
  icon: {
    width: normalizePixelSize(24, 'height'),
    height: normalizePixelSize(24, 'height'),
    resizeMode: 'contain',
    tintColor: colors.dark,
  },
});
