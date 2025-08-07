import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IQuestionAndAnswer {
  title: string
  description: string
}
interface IFAQSSliceState {
  faqs: IQuestionAndAnswer[],
  isLoading: boolean;
  success: string | null;
  error: string | null;
}
const initialState: IFAQSSliceState = {
  faqs: [],
  isLoading: false,
  success: null,
  error: null,
};

const faqsSlice = createSlice({
  name: 'faqs',
  initialState,
  reducers: {
    setFaqs: (state, action: PayloadAction<IQuestionAndAnswer[]>) => {
      state.faqs = action.payload;
    },
    // common actions
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string | null> ) => {
      state.success = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clean: (state) => {
      state.error = null;
      state.success = null;
      state.isLoading = false;
    },
  },
});

export const faqsActions = faqsSlice.actions;

export const FAQsReducer = faqsSlice.reducer;
