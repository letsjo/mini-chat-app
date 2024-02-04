import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { RoomInfo } from '@/types';

import ImageProfile from '@/components/_public/ImageProfile';
import useRoomInfo from '@/stores/useRoomInfo';
import { getMessageListApi, getRoomInfoApi } from '@/utils/server';

interface RoomCardProps {
  roomData: RoomInfo;
}

function RoomCard({ roomData }: RoomCardProps) {
  const { setRoomInfo, setMessages } = useRoomInfo();
  const navigate = useNavigate();

  const handleRoomClick = async () => {
    const currentRoomInfo = await getRoomInfoApi(roomData.id);
    const messageList = await getMessageListApi(roomData.id);

    setRoomInfo(currentRoomInfo);
    setMessages(messageList);

    navigate(`/chat/${roomData.id}`);
  };

  return (
    <Container onClick={handleRoomClick}>
      <ImageProfile src={roomData.profile} alt={roomData.title} />
      <RoomInfoData>{roomData.title}</RoomInfoData>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  padding: 10px 0;
  margin: 5px 0;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const RoomInfoData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;

  margin-left: 10px;
`;

export default RoomCard;
