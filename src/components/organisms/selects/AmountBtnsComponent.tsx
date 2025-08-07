import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { add_icon, substract_icon } from '@app/utils/images';
import { normalizePixelSize } from '@app/utils/normalize';
import { colors } from '@app/theme';

type Props = {
  value?: number;
  onChange?: (value: number) => void;
  // onPressAdd?: (value: number) => void;
  // onPressSubtract?: (value: number) => void;
  disableAdd?: boolean;
  disableSubtract?: boolean;
}

const AmountBtnsComponent = (props: Props) => {
  const [amount, setAmount] = useState(props.value || 0);

  function handleAdd() {
    setAmount(amount + 1);
    props.onChange && props.onChange(amount + 1);
  }

  function handleSubtract() {
    if (amount > 0) {
      setAmount(amount - 1);
      props.onChange && props.onChange(amount - 1);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleSubtract}
        style={props.disableSubtract
          ? styles.iconContainerDisabled
          : styles.iconContainerActive
        }
        disabled={props.disableSubtract}
      >
        <Image
          source={substract_icon}
          style={props.disableSubtract
            ? styles.iconDisabled
            : styles.iconActive
          }
        />
      </Pressable>

      <TextComponent
        size="16"
        color={(props.disableSubtract && props.disableAdd) ? 'muted' : 'dark'}
      >
        {amount}
      </TextComponent>

      <Pressable
        onPress={handleAdd}
        style={props.disableAdd
          ? styles.iconContainerDisabled
          : styles.iconContainerActive
        }
        disabled={props.disableAdd}
      >
        <Image
          source={add_icon}
          style={props.disableAdd
            ? styles.iconDisabled
            : styles.iconActive
          }
        />
      </Pressable>
    </View>
  );
};

export default AmountBtnsComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: normalizePixelSize(12, 'width'),
  },
  // custom button theme
  iconAddContainer: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: normalizePixelSize(28, 'height'),
    height: normalizePixelSize(28, 'height'),
    backgroundColor: colors.primary,
  },
  iconSubstractContainer: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: normalizePixelSize(28, 'height'),
    height: normalizePixelSize(28, 'height'),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lowlight,
  },
  iconAdd: {
    width: normalizePixelSize(16, 'height'),
    height: normalizePixelSize(16, 'height'),
    tintColor: colors.white,
    resizeMode: 'cover',
  },
  iconSubstract: {
    width: normalizePixelSize(16, 'height'),
    height: normalizePixelSize(16, 'height'),
    tintColor: colors.muted,
    resizeMode: 'cover',
  },
  // generic theme
  iconContainerActive: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: normalizePixelSize(28, 'height'),
    height: normalizePixelSize(28, 'height'),
    backgroundColor: colors.primary,
  },
  iconContainerDisabled: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: normalizePixelSize(28, 'height'),
    height: normalizePixelSize(28, 'height'),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lowlight,
  },
  iconActive: {
    width: normalizePixelSize(16, 'height'),
    height: normalizePixelSize(16, 'height'),
    tintColor: colors.white,
    resizeMode: 'cover',
  },
  iconDisabled: {
    width: normalizePixelSize(16, 'height'),
    height: normalizePixelSize(16, 'height'),
    tintColor: colors.muted,
    resizeMode: 'cover',
  },
});
