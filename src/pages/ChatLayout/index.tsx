import styled from 'styled-components';

import ChatRoom from '@/components/ChatRoom';
import MembersList from '@/components/MembersList';
import usePageState from '@/stores/usePageState';

const ChatLayout = () => {
  const { showCurrentUserPage, setShowCurrentUserPage } = usePageState();

  return (
    <Container>
      <ChatRoom setShowCurrentUserPage={setShowCurrentUserPage} />
      {showCurrentUserPage && <MembersList />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 80%;
`;

export default ChatLayout;
