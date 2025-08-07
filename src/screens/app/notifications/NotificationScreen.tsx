import { Alert, FlatList, ListRenderItem, RefreshControl, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { getAlluserNotificationsService } from '@app/store/slices/notifications/notification.service';

import NotificationItem from './components/NotificationItem';

import { normalizePixelSize } from '@app/utils/normalize';
import { calendar_outline_icon } from '@app/utils/images';

import { colors } from '@app/theme';
import { INotificationItem } from '@app/types';

const NotificationScreen = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading, notifications, error } = useAppSelector(state => state.notifications);
  const { language } = useAppSelector(state => state.general);

  useFocusEffect(
    useCallback(() => {
      dispatch(getAlluserNotificationsService(language));
    }, [dispatch, language])
  );

  const reloadData = async () => {
    dispatch(getAlluserNotificationsService(language));
  };

  useFocusEffect(
    useCallback(() => {
      if (error) {
        Alert.alert(
          t('notification_screen_error'),
          error,
          [
            {
              text: t('notification_screen_cancel'),
              style: 'cancel',
            },
            {
              text: t('notification_screen_retry'),
              onPress: () => dispatch(getAlluserNotificationsService(language)),
              style: 'default',
            },
          ],
          { cancelable: false }
        );
      }
    }, [error, dispatch, language, t])
  );

  const renderItem: ListRenderItem<INotificationItem> = ({ item, index }) => {
    return (
      <NotificationItem
        key={index}
        title={item.descp}
        description={item.date}
        imageSource={calendar_outline_icon}
      />
    );
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} />
      <FlatList
        style={styles.main}
        contentContainerStyle={styles.scrollContent}
        data={notifications}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={reloadData} />}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: normalizePixelSize(20, 'width'),
    paddingTop: normalizePixelSize(20, 'height'),
    paddingBottom: normalizePixelSize(40, 'height'),
    gap: normalizePixelSize(20, 'height'),
  },
});
