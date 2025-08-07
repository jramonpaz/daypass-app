import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ButtonComponent from '@app/components/molecules/buttons/ButtonComponent';
import BaseCenterModal, { BaseCenterModalProps } from '@app/components/molecules/modals/BaseCenterModal';
import TextComponent from '@app/components/atoms/text/TextComponent';

import { normalizePixelSize } from '@app/utils/normalize';
import { checkmark_icon } from '@app/utils/images';

import { colors } from '@app/theme';

export type ActionsModalBaseProps = BaseCenterModalProps & {
  onConfirm?: () => void;
  onDismiss?: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  dismissText?: string;
  children?: React.ReactNode;
  hideDissmissBtn?: boolean;
  actionShowCenter?: boolean;
  icon?: 'success';
  actionsFullFill?: boolean;
};

const ActionsModalBase = (props: ActionsModalBaseProps) => {
  const { t } = useTranslation();

  function handleDismiss() {
    props.onDismiss?.();
    props.setIsVisible(false);
  }

  function handleConfirm() {
    props.onConfirm?.();
    props.setIsVisible(false);
  }

  return (
    <BaseCenterModal
      {...props}
      style={styles.content}
      animationType={props.animationType || 'fade'}
    >
      {props.icon && props.icon === 'success' && (
        <Image source={checkmark_icon} style={styles.icon} />
      )}

      {props.title && (
        <TextComponent textAlign="center" size="18" weight="bold" color="dark">
          {props.title}
        </TextComponent>
      )}

      {props.message && (
        <TextComponent textAlign="center" size="16" color="dark">
          {props.message}
        </TextComponent>
      )}

      {props.children}
      <View
        style={[
          styles.actionsContainer,
          props.actionShowCenter && styles.showCenter,
        ]}
      >
        {!props.hideDissmissBtn && (
          <ButtonComponent
            theme="outline"
            onPress={handleDismiss}
            style={[
              styles.actionButton,
              props.actionsFullFill && styles.actionsFullFilled,
            ]}
            title={props.dismissText || t('actions_modal_base_cancel')}
          />
        )}
        <ButtonComponent
          onPress={handleConfirm}
          style={[
            styles.actionButton,
            props.actionsFullFill && styles.actionsFullFilled,
            props.actionShowCenter && styles.buttonCenter,
          ]}
          title={props.confirmText || t('actions_modal_base_accept')}
        />
      </View>
    </BaseCenterModal>
  );
};

export default ActionsModalBase;

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    // backgroundColor: 'red',
    bottom: 0,
    gap: 12,
  },
  showCenter: {
    justifyContent: 'center',
  },
  actionButton: {
    height: normalizePixelSize(40, 'height'),
  },
  actionsFullFilled: {
    flex: 1,
  },
  buttonCenter: {
    paddingHorizontal: normalizePixelSize(28, 'height'),
  },
  content: {
    paddingHorizontal: normalizePixelSize(32, 'width'),
    paddingVertical: normalizePixelSize(32, 'height'),
    gap: normalizePixelSize(24, 'height'),
  },
  icon: {
    width: normalizePixelSize(24, 'height'),
    height: normalizePixelSize(24, 'height'),
    tintColor: colors.primary,
    // marginBottom: normalizePixelSize(16, 'height'),
    // alignSelf: 'center',
    resizeMode: 'contain',
  },
});
