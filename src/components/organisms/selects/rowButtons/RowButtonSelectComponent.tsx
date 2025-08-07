import { StyleSheet, View } from 'react-native';
import React from 'react';

import ButtonRowItem from './ButtonRowItem';

import { normalizePixelSize } from '@app/utils/normalize';
import { useTranslation } from 'react-i18next';

// type ButtonRowItemType = {
//   label: string;
//   isActive: boolean;
//   onPress?: () => void;
//   disabled?: boolean;
// }

type ActiveIdxType =  1 | 2 | 3;
type Props = {
  // buttons: ButtonRowItemType[];
  // onPress?: (button: ButtonRowItemType) => void;
  active: ActiveIdxType
  onPress?: (buttonIndx: ActiveIdxType) => void;
}

const RowButtonSelectComponent = (props: Props) => {

  const {t} = useTranslation();

  function handleOnPress (idx: ActiveIdxType) {
    props.onPress && props.onPress(idx);
  }

  return (
    <View style={styles.container}>
      <ButtonRowItem
        label={t('most_relevant')}
        isActive={props.active === 1}
        onPress={() => handleOnPress(1)}
      />

      <ButtonRowItem
        label={t('highest_price')}
        isActive={props.active === 2}
        onPress={() => handleOnPress(2)}
      />

      <ButtonRowItem
        label={t('lowest_price')}
        isActive={props.active === 3}
        onPress={() => handleOnPress(3)}
      />
    </View>
  );

};

export default RowButtonSelectComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 16,
    // paddingVertical: 8,
    gap: normalizePixelSize(8, 'width'),
  },
});
