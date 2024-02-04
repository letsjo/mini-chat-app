import { USER_TOKEN_KEY } from '@/constants';

export const getUserInfoFromLocalStorage = (): string | null => {
  const userId = localStorage.getItem(USER_TOKEN_KEY);
  return userId ? userId : null;
};

export const setUserInfoToLocalStorage = (user_id: string): void => {
  localStorage.setItem(USER_TOKEN_KEY, user_id);
};

export const isAuthenticated = (): boolean => {
  return Boolean(localStorage.getItem(USER_TOKEN_KEY));
};
