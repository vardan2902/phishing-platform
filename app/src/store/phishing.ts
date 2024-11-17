import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';
import isEqual from 'lodash.isequal';
import api from '../core/api';

interface PhishingAttempt {
  id: string;
  email: string;
  status: string;
  content: string;
}

interface ApiError {
  response?: {
    data?: string;
  };
}

export type PhishingState = {
  phishingPost: {
    phishing: string | null;
    loading: boolean;
    error: string | null;
  };
  phishingAttempts: {
    phishingList: PhishingAttempt[] | null;
    loading: boolean;
    error: string | null;
  };
};

export const usePhishingStore = createWithEqualityFn(
  immer<
    PhishingState & {
      postPhishing: (email: string) => Promise<void>;
      fetchPhishingAttempts: () => Promise<void>;
    }
  >((set, get) => ({
    phishingPost: {
      phishing: null,
      loading: false,
      error: null,
    },
    phishingAttempts: {
      phishingList: null,
      loading: false,
      error: null,
    },
    async postPhishing(email) {
      set((state) => {
        state.phishingPost.loading = true;
        state.phishingPost.error = null;
      });
      try {
        const { data } = await api.post<string>('/phishing/send', { email });
        set((state) => {
          state.phishingPost.phishing = data;
          state.phishingPost.loading = false;
        });
        await get().fetchPhishingAttempts();
      } catch (error: unknown) {
        const apiError = error as ApiError;
        set((state) => {
          state.phishingPost.error =
            apiError.response?.data || 'Unexpected error';
          state.phishingPost.loading = false;
        });
      }
    },
    async fetchPhishingAttempts() {
      set((state) => {
        state.phishingAttempts.loading = true;
      });
      try {
        const { data } = await api.get<PhishingAttempt[]>('/phishing/attempts');
        set((state) => {
          state.phishingAttempts.phishingList = data;
          state.phishingAttempts.loading = false;
        });
      } catch (error: unknown) {
        const apiError = error as ApiError;
        set((state) => {
          state.phishingAttempts.error =
            apiError.response?.data || 'Unexpected error';
          state.phishingAttempts.loading = false;
        });
      }
    },
  })),
  isEqual,
);
