import { StyleSheet, View } from 'react-native';
import React from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { formatToCurrency } from '@app/utils/number.util';
import { colors } from '@app/theme/colors';
import { useAppSelector } from '@app/hooks/redux.hook';

type Props = {
  minValue: number;
  maxValue: number;
  step?: number;
  selectedValues?: number[];
  onValuesChange?: (values: number[]) => void;
  onValuesChangeFinish?: (values: number[]) => void;
  leftLabel?: string;
  rightLabel?: string;
};

const MultiSliderSelect = (props: Props) => {
  const {currency, currencySelected} = useAppSelector(state => state.general);

  const handleOnChangeValues = (newValues: number[]) => {
    props.onValuesChange && props.onValuesChange(newValues);
  };

  const handleOnChangeValuesFinished = (newValues: number[]) => {
    props.onValuesChangeFinish && props.onValuesChangeFinish(newValues);
  };

  return (
    <View style={styles.container}>
      <MultiSlider
        min={props.minValue}
        max={props.maxValue}
        isMarkersSeparated={true}
        values={props.selectedValues ?? [props.minValue, props.maxValue]}
        step={props.step ?? 1}
        markerStyle={styles.slider}
        trackStyle={styles.trackStyle}
        selectedStyle={styles.selectedStyle}
        onValuesChange={handleOnChangeValues}
        onValuesChangeFinish={handleOnChangeValuesFinished}
      />

      {!props.leftLabel && (
        <View style={styles.leftContainer}>
          <TextComponent size="14" color="dark" >{`${currencySelected.symbol}${formatToCurrency(props.selectedValues ? props.selectedValues[0] : props.minValue)}`}</TextComponent>
        </View>
      )}

      {!props.rightLabel && (
        <View style={styles.rightContainer}>
          <TextComponent size="14" color="dark" >{`${currencySelected.symbol}${formatToCurrency(props.selectedValues ? props.selectedValues[1] : props.maxValue)}+`}</TextComponent>
        </View>
      )}
    </View>
  );
};

export default MultiSliderSelect;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  slider: {
    backgroundColor: colors.white,
    height: 26,
    width: 26,
    borderRadius: 15,
    // marginHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.lowlight,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedStyle: {
    backgroundColor: colors.primary,
    height: 2,
  },
  trackStyle: {
    backgroundColor: colors.lowlight,
    height: 2,
  },
  leftContainer: {
    position: 'absolute',
    top: -10,
    left: -10,
    alignItems: 'center',
    alignSelf: 'center',
    width: 60,
    // backgroundColor: 'red',
    // justifyContent: 'center',
  },
  rightContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    alignItems: 'center',
    width: 60,
    // backgroundColor: 'red',
    // justifyContent: 'center',
  },
});
