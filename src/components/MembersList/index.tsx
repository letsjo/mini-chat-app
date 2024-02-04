// import { useEffect } from 'react';
import styled from 'styled-components';

import MemberCard from './MemberCard';

import useRoomInfo from '@/stores/useRoomInfo';

const MembersList = () => {
  const { roomInfo } = useRoomInfo();

  return (
    <Container>
      {roomInfo ? (
        roomInfo.members.map((member, index) => <MemberCard key={index} member={member} />)
      ) : (
        <></>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #fff;
  border-radius: 10px;
  height: 95vh;
  min-width: 250px;
  width: 40%;
  gap: 0px;
  margin: 10px;
  padding: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

export default MembersList;
