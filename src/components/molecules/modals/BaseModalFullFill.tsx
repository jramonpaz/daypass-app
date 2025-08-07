import { Modal, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { colors } from '@app/theme/colors';

export type BaseModalFullFillProps = PropsWithChildren & {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const BaseModalFullFill = (props: BaseModalFullFillProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={() => {
        props.setIsVisible(false);
      }}>
      <View style={styles.centeredView}>
        {Platform.OS === 'ios' ? (
          <SafeAreaView style={styles.modalView} >
            {props.children}
          </SafeAreaView>
        ) : (
          <View style={styles.modalView} >
            {props.children}
          </View>
        )}
      </View>
    </Modal>
  );
};

export default BaseModalFullFill;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black_a40,
  },
  modalView: {
    margin: 0,
    width: '100%',
    height: '100%',
    bottom: 0,
    position: 'absolute',
    backgroundColor: colors.white,
    // alignItems: 'center',
  },
});
