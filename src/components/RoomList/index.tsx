import React, { useEffect } from 'react';
import styled from 'styled-components';

import RoomCard from './RoomCard';

import useUserInfo from '@/stores/useUserInfo';
import { createRoomApi, getRoomsInfoFromServer } from '@/utils/server';

function RoomList() {
  const { userInfo, rooms, setRooms } = useUserInfo();

  const handleCreateRoom = async () => {
    const newRoom = await createRoomApi('new room', userInfo.id);
    setRooms([...rooms, newRoom]);
  };

  useEffect(() => {
    const getChatData = async (chatIds: string[]) => {
      const { rooms_info: rooms } = await getRoomsInfoFromServer(chatIds);
      setRooms(rooms);
    };

    getChatData(userInfo.chats);
  }, [userInfo]);

  return (
    <Container>
      <TitleBox>
        <h2>Messages</h2>
        <IconButton onClick={handleCreateRoom}>➕</IconButton>
      </TitleBox>
      <RoomListBox>
        {rooms && rooms.map((room, index) => <RoomCard key={index} roomData={room} />)}
      </RoomListBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 18%;
  min-width: 300px;
  height: 95%;
  padding: 10px;
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  border-bottom: 1px solid #e5e5e5;

  & {
    text-align: left;
  }
`;

const IconButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: #e5e5e5;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const RoomListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  padding-top: 10px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export default RoomList;
