import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import RoomList from '@/components/RoomList';

const MainLayout = () => {
  return (
    <Container>
      <RoomList />
      <Outlet />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  height: calc(var(--vh, 1vh) * 100);
`;

export default MainLayout;
