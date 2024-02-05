import styled from 'styled-components';

import useRoomInfo from '@/stores/useRoomInfo';

const MessageList = () => {
  const { messages } = useRoomInfo();

  return (
    <Container>
      {messages.map((message, index) => (
        <div key={index}>{new Date(message.timestamp).toString()} / {message.user} : {message.message}</div>
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

export default MessageList;
