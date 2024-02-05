import styled from 'styled-components';

import useRoomInfo from '@/stores/useRoomInfo';
import useUserInfo from '@/stores/useUserInfo';

const MessageList = () => {
  const { userInfo } = useUserInfo();
  const { messages } = useRoomInfo();

  return (
    <Container>
      {messages.map((message, index) => (
        <ChatMessageBox key={index} className={message.user === userInfo.id? 'me':''}> {new Date(message.timestamp).toString()} / {message.user} : {message.message}</ChatMessageBox>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;

  width: 100%;
  height: 100%;

  padding-top: 20px;
`;

const ChatMessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 10px 20px;
  margin: 5px 0;
  border-radius: 10px;
  background-color: #f0f0f0;

  &.me {
    align-items: flex-end;
    background-color: #d3f4ff;
  }
`;

export default MessageList;
