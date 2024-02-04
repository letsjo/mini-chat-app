import React from 'react';
import styled from 'styled-components';

import { UserInfo } from '@/types';

import ImageProfile from '@/components/_public/ImageProfile';

interface MemberCardProps {
  member: Partial<UserInfo>;
}

function MemberCard({ member }: MemberCardProps) {
  return (
    <Container>
      <ImageProfile src={member.profile} alt={member.nickname} />
      <UserInfoData>{member.nickname}</UserInfoData>
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

const UserInfoData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;

  margin-left: 10px;
`;

export default MemberCard;
