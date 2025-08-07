import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';

import PinMarkerIcon from '../atoms/icons/PinMarkerIcon';
import { colors } from '@app/theme';
import TextComponent from '../atoms/text/TextComponent';

type Props = {
  size?: number;
  isSelected?: boolean;
  label?: string;
  onPress?: () => void;
}

const MapMarkerComponenent = (props: Props) => {
  // const [isSelected, setIsSelected] = useState(props.isSelected ?? false);

  function handleOnPress () {
    // setIsSelected(!isSelected);
    props.onPress && props.onPress();
  }

  return (
    <Pressable
      onPress={handleOnPress}
      style={[styles.container, props.isSelected && styles.isSelected]}
    >
      <PinMarkerIcon
        size={props.size}
        fillColor={props.isSelected ? colors.primary : colors.blueSecondary}
      />
      <View style={styles.labelContainer}>
        <TextComponent
          size="12"
          font="bold"
          color={props.isSelected ? 'white' : 'primary'}
        >
          {props.label}
        </TextComponent>
      </View>
    </Pressable>
  );
};

export default MapMarkerComponenent;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    position: 'absolute',
    left: 10,
    top: 14,
  },
  isSelected: {
    zIndex: Number.MAX_SAFE_INTEGER,
  },
});
