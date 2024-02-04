import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PATH_ROUTE } from '@/constants';
import { setUserInfoToLocalStorage } from '@/utils';

import useUserInfo from '@/stores/useUserInfo';
import { loginApi } from '@/utils/server';

const Login = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useUserInfo();

  const user_id = 'hyunoh2';

  const handleLogin = async (login_id: string) => {
    const { is_login, user_info } = await loginApi(login_id);

    if (is_login === false) {
      window.alert('사용자 정보를 찾을 수 없습니다.');
      return;
    }

    setUserInfoToLocalStorage(user_info.id);

    setUserInfo({
      id: user_info.id,
      nickname: user_info.nickname,
      profile: user_info.profile,
      chats: [...user_info.chats],
    });

    navigate(PATH_ROUTE.chat);
  };

  return (
    <Container>
      <LoginButton onClick={() => handleLogin(user_id)}>로그인</LoginButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const LoginButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
`;

export default Login;
