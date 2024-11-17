import { immer } from 'zustand/middleware/immer';
import isEqual from 'lodash.isequal';
import { createWithEqualityFn } from 'zustand/traditional';
import api from '../core/api';
import { Nullable } from '../types/common';
import { setToLocalStorage } from '../utils/ls-utils.ts';

interface AuthData {
  email: Nullable<string>;
  fullName: Nullable<string>;
  id: Nullable<string>;
}

interface SignInResponse extends AuthData {
  access_token: string;
}

export type AuthState = {
  signedIn: {
    data: Nullable<SignInResponse>;
    loading: boolean;
    error: string | null;
  };
  userProfile: {
    data: Nullable<AuthData>;
    loading: boolean;
    error: string | null;
  };
};

export const useAuthStore = createWithEqualityFn(
  immer<
    AuthState & {
      signIn: (email: string, password: string) => Promise<void>;
      signUp: (
        email: string,
        password: string,
        fullName: string,
      ) => Promise<void>;
      fetchUserProfile: () => Promise<void>;
      clearSignIn: () => void;
    }
  >((set) => ({
    signedIn: {
      data: null,
      loading: false,
      error: null,
    },
    userProfile: {
      data: null,
      loading: false,
      error: null,
    },
    async signIn(email, password) {
      set((state) => {
        state.signedIn.loading = true;
        state.signedIn.error = null;
      });
      try {
        const response = await api.post<SignInResponse>('/auth/login', {
          email,
          password,
        });
        set((state) => {
          state.signedIn.data = response.data;
          state.signedIn.loading = false;
        });
        setToLocalStorage('access_token', response.data.access_token);
      } catch (error: any) {
        set((state) => {
          state.signedIn.error = error.response?.data || 'Unexpected error';
          state.signedIn.loading = false;
        });
      }
    },
    async signUp(email, password, fullName) {
      set((state) => {
        state.signedIn.loading = true;
        state.signedIn.error = null;
      });
      try {
        const response = await api.post<SignInResponse>('/auth/sign-up', {
          email,
          password,
          fullName,
        });
        set((state) => {
          state.signedIn.data = response.data;
          state.signedIn.loading = false;
        });
        setToLocalStorage('access_token', response.data.access_token);
      } catch (error: any) {
        set((state) => {
          state.signedIn.error = error.response?.data || 'Unexpected error';
          state.signedIn.loading = false;
        });
      }
    },
    async fetchUserProfile() {
      set((state) => {
        state.userProfile.loading = true;
      });
      try {
        const response = await api.get<AuthData>('/user/profile');
        set((state) => {
          state.userProfile.data = response.data;
          state.userProfile.loading = false;
        });
      } catch (error: any) {
        set((state) => {
          state.userProfile.error = error.response?.data || 'Unexpected error';
          state.userProfile.loading = false;
        });
      }
    },
    clearSignIn() {
      set((state) => {
        state.signedIn.data = null;
      });
    },
  })),
  isEqual,
);
