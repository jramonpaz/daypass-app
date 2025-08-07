import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { t } from 'i18next';

import i18n from '../../../../i18n';

import { notificationActions } from './notification.slice';

export const getAlluserNotificationsService = (lang: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(notificationActions.clean());
    dispatch(notificationActions.setIsLoading(true));

    const payload = {
      lang: lang ?? i18n.language,
    };

    const { status, data } = await axios.post('/user/notifications', payload);
    // 200 = Ok
    // 400 = BadRequest
    // 401 = Unauthorized
    // 5xx = InternalServerError
    if (status === 200) {
      dispatch(notificationActions.setSuccess(t('notification-service-notifications-loaded')));
      dispatch(notificationActions.setAllNotifications(data.data));
    } else if (status === 400) {
      dispatch(notificationActions.setError(t('notification-service-invalid-request')));
    } else if (status === 401) {
      dispatch(notificationActions.setError(t('notification-service-unauthorized')));
    } else {
      dispatch(notificationActions.setError(t('notification-service-notifications-error')));
    }
  } catch (error) {
    console.error('Error getting all user notifications', error);
    dispatch(notificationActions.setError(t('notification-service-notifications-error')));
  } finally {
    dispatch(notificationActions.setIsLoading(false));
  }
};
