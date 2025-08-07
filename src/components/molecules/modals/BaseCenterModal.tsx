import { Modal, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React, { PropsWithChildren } from 'react';

import { colors } from '@app/theme';

export type BaseCenterModalProps = PropsWithChildren & {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  style?: StyleProp<ViewStyle>;
  animationType?: 'none' | 'slide' | 'fade';
  backGroundBluelight?: boolean;
};

const BaseCenterModal = (props: BaseCenterModalProps) => {
  return (
    <Modal
      animationType={props.animationType || 'slide'}
      transparent={true}
      visible={props.isVisible}
      onRequestClose={() => {
        props.setIsVisible(false);
      }}>
      <View style={[
          styles.centeredView,
          props.backGroundBluelight && styles.bgBluelight,
        ]}
      >
        <View style={[styles.modalView, props.style]}>
          {props.children}
        </View>
      </View>
    </Modal>
  );
};

export default BaseCenterModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black_a40,
  },
  bgBluelight: {
    backgroundColor: colors.primary_a80,
  },
  modalView: {
    margin: 0,
    width: '80%',
    minHeight: '20%',
    // bottom: 0,
    // position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 20,
    // paddingHorizontal: normalizePixelSize(20, 'width'),
    // paddingVertical: normalizePixelSize(20, 'height'),
    // paddingBottom: 10,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
});
