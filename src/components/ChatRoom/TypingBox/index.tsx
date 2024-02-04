import React, { useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import styled from 'styled-components';

import useRoomInfo from '@/stores/useRoomInfo';
import { sendMessageApi } from '@/utils/server';

interface TypingBoxProps {
  roomId: string;
  userId: string;
}

const TypingBox = ({ roomId, userId }: TypingBoxProps) => {
  const { sendNewMessage } = useRoomInfo();

  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const myFormRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleSendMessage();
  };

  const onEnterPress = (e: any) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      myFormRef.current?.requestSubmit();
    }
  };

  const handleSendMessage = async () => {
    setMessage('');

    const { isSuccess, messageInfo } = await sendMessageApi({
      roomId,
      userId,
      message,
    });

    if (isSuccess) {
    }
    sendNewMessage(messageInfo);
  };

  const handleChatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <Container>
      <ChatFooter ref={myFormRef} onSubmit={handleSubmit}>
        <InputSection
          ref={inputRef}
          value={message}
          onChange={handleChatChange}
          onKeyDown={onEnterPress}
          placeholder={'enter Your Message'}
        />
        <OptionSection>
          <FiSend />
        </OptionSection>
      </ChatFooter>
    </Container>
  );
};

export default TypingBox;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  z-index: 1;
`;

const InputSection = styled.input`
  display: flex;
  padding: 0px 8px;
  align-items: flex-start;

  width: 100%;

  border: none;
  outline: none;

  font-size: 16px;
  font-weight: 400;
  line-height: 24px;

  resize: none;
`;

const ChatFooter = styled.form`
  display: flex;
  gap: 8px;
  position: relative;

  padding: 12px 16px;
  margin: 4px 14px 22px 14px;
  background-color: white;
  border-radius: 8px;

  /* Default border */
  border: 1px solid #b7b7b7;

  // shadow
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const OptionSection = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 24px;
  height: 24px;

  cursor: pointer;
`;
