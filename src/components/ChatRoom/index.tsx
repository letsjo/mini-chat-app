import { FaUsers } from 'react-icons/fa';
import { FaDoorOpen } from 'react-icons/fa6';
import styled from 'styled-components';

import MessageList from '../MessageList';

import TypingBox from './TypingBox';

import useRoomInfo from '@/stores/useRoomInfo';
import useUserInfo from '@/stores/useUserInfo';
import { leaveRoomApi } from '@/utils/server';

interface ChatRoomProps {
  setShowCurrentUserPage: () => void;
}

const ChatRoom = ({ setShowCurrentUserPage }: ChatRoomProps) => {
  const { userInfo, leaveRoom } = useUserInfo();
  const { roomInfo } = useRoomInfo();

  const handleShowCurrentUserPage = () => {
    setShowCurrentUserPage();
  };

  const handleLeaveRoom = async () => {
    const isSuccess = await leaveRoomApi(roomInfo.id, userInfo.id);

    if (isSuccess) {
      leaveRoom(roomInfo.id);
    }
  };

  return (
    <Container>
      <TitleBox>
        <h2>{roomInfo.title}</h2>
        <ButtonGroupBox>
          <button onClick={handleShowCurrentUserPage}>
            <FaUsers size={30} />
          </button>
          <button onClick={handleLeaveRoom}>
            <FaDoorOpen size={30} />
          </button>
        </ButtonGroupBox>
      </TitleBox>
      <MessageList />
      <TypingBox roomId={roomInfo.id} userId={userInfo.id} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  background-color: #fff;
  border-radius: 10px;
  height: 95vh;
  width: 100%;
  gap: 0px;
  margin: 10px;
  padding: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ButtonGroupBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: none;
    background-color: #e5e5e5;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

export default ChatRoom;
