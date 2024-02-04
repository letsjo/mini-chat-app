import { redirect } from 'react-router-dom';

import { PATH_ROUTE } from '@/constants';
import { getUserInfoFromLocalStorage, setUserInfoToLocalStorage } from '@/utils';

import { loginApi } from '@/utils/server';

export const authLoader = async () => {
  const userId = getUserInfoFromLocalStorage();

  if (userId) {
    const { is_login } = await loginApi(userId);

    if (is_login) {
      return redirect(PATH_ROUTE.chat);
    }
  }

  // 유저 데이터 지우기 & 다시 로그인
  setUserInfoToLocalStorage('');

  return null;
};
