import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { USER_TOKEN_KEY } from '@/constants';
import { isAuthenticated } from '@/utils';

import useUserInfo from '@/stores/useUserInfo';
import { loginApi } from '@/utils/server';

const EnsureAuthenticated: React.FC<{ fallback: JSX.Element; children: JSX.Element }> = ({
  fallback,
  children,
}) => {
  const location = useLocation();
  const { setUserInfo } = useUserInfo();
  const params = useParams();

  useEffect(() => {
    if (!isAuthenticated()) {
      localStorage.removeItem(USER_TOKEN_KEY);
    } else {
      const setUser = async () => {
        const user_id = localStorage.getItem(USER_TOKEN_KEY) as string;

        const { is_login, user_info } = await loginApi(user_id);

        if (is_login === false) {
          localStorage.removeItem(USER_TOKEN_KEY);
          return;
        }

        setUserInfo({
          id: user_info.id,
          nickname: user_info.nickname,
          profile: user_info.profile,
          chats: [...user_info.chats],
        });
      };

      setUser();
    }
  }, [location, params, setUserInfo]);

  return isAuthenticated() ? children : fallback;
};

export default EnsureAuthenticated;
