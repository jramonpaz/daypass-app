import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { t } from 'i18next';

import i18n from '../../../../i18n';

import { faqsActions } from './faqs.slice';

import { createQueryParams } from '@app/utils/query.util';

export const getFAQsService = () => async (dispatch: Dispatch) => {
  try {
    dispatch(faqsActions.clean());
    dispatch(faqsActions.setIsLoading(true));

    const query = {
      lang: i18n.language, // Use current language
    };

    const url = `/general/getFAQ?${createQueryParams(query)}`;
    const { data: response, status } = await axios.get(url);
    // status
    // 200 = Ok
    // 400 = BadRequest
    // 500 = InternalServerError
    if (status === 200) {
      dispatch(faqsActions.setSuccess(t('faqs-service-faqs-loaded')));
      dispatch(faqsActions.setFaqs(response.data));
    } else {
      dispatch(faqsActions.setError(t('faqs-service-get-faqs-error')));
      dispatch(faqsActions.setFaqs([]));
    }
  } catch (error) {
    console.error('Error getting FAQs from API: ',error);
    dispatch(faqsActions.setError(t('faqs-service-get-faqs-error-try-again')));
  } finally {
    dispatch(faqsActions.setIsLoading(false));
  }
};
