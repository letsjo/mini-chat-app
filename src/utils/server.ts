import { v4 as uuid } from 'uuid';

import { MemberInfo, MessageInfo, RoomInfo, RoomInfoDetail, UserInfo } from '@/types';

interface getUserDataResult {
  is_login: boolean;
  user_info: UserInfo;
}

interface getChatDataResult {
  rooms_info: RoomInfo[];
}

interface ISendMessageRequest {
  roomId: string;
  userId: string;
  message: string;
}

interface ISendMessageResult {
  isSuccess: boolean;
  messageInfo: MessageInfo;
}

const initial_chat_data = require('@/json/data.json');

const getMemberInfo = (userId: string): MemberInfo | undefined => {
  const user_info = initial_chat_data.users[userId];

  if (!user_info) {
    return undefined;
  }

  return { id: user_info.id, nickname: user_info.nickname, profile: user_info.profile };
};

export const loginApi = async (userId: string): Promise<getUserDataResult> => {
  const user_info = initial_chat_data.users[userId];

  if (!user_info) {
    return { is_login: false, user_info: {} as UserInfo };
  }

  return { is_login: true, user_info: { id: userId, ...user_info } };
};

export const getRoomsInfoFromServer = async (roomIds: string[]): Promise<getChatDataResult> => {
  const rooms_info = [];

  for (const roomId of roomIds) {
    const room_info = initial_chat_data.rooms[roomId];

    if (room_info) {
      rooms_info.push({ ...room_info, id: roomId });
    }
  }

  // Sort by last_timestamp
  rooms_info.sort((a: RoomInfo, b: RoomInfo) => {
    return (
      new Date(b.last_timestamp as string).getTime() -
      new Date(a.last_timestamp as string).getTime()
    );
  });

  return { rooms_info };
};

export const createRoomApi = async (roomName: string, userId: string): Promise<RoomInfo> => {
  const newRoomId = `room_${uuid()}`;

  const newRoom = {
    title: roomName,
    profile: '',
    users: [userId],
  };

  initial_chat_data.messages[newRoomId] = [
    {
      type: 'notice',
      id: uuid(),
      message: '방이 생성되었습니다.',
    },
    {
      type: 'notice',
      id: uuid(),
      user: userId,
      timestamp: new Date().toString(),
      message: `${userId}님이 방에 입장하였습니다.`,
    },
  ];

  initial_chat_data.users[userId].chats.push(newRoomId);
  initial_chat_data.rooms[newRoomId] = newRoom;

  return { id: newRoomId, ...newRoom };
};

export const leaveRoomApi = async (roomId: string, userId: string): Promise<boolean> => {
  const room_info = initial_chat_data.rooms[roomId];

  if (!room_info) {
    return false;
  }

  const newUsers = room_info.users.filter((id: string) => id !== userId);

  if (newUsers.length === 0) {
    delete initial_chat_data.rooms[roomId];
  } else {
    initial_chat_data.rooms[roomId].users = newUsers;
  }

  // 유저 정보에서도 삭제
  initial_chat_data.users[userId].chats = initial_chat_data.users[userId].chats.filter(
    (id: string) => id !== roomId,
  );

  return true;
};

export const getRoomInfoApi = async (roomId: string): Promise<RoomInfoDetail> => {
  const room_info = initial_chat_data.rooms[roomId];

  if (!room_info) {
    return {} as RoomInfoDetail;
  }

  const current_members = [] as MemberInfo[];

  room_info.users.forEach((userId: string) => {
    const user_info = getMemberInfo(userId);

    if (user_info) {
      current_members.push(user_info);
    }
  });

  return { ...room_info, id: roomId, members: current_members };
};

export const getMessageListApi = async (roomId: string): Promise<any> => {
  const message_list = initial_chat_data.messages[roomId];

  if (!message_list) {
    return [];
  }

  return message_list;
};

export const sendMessageApi = async ({
  roomId,
  userId,
  message,
}: ISendMessageRequest): Promise<ISendMessageResult> => {
  if (!initial_chat_data.messages[roomId]) {
    initial_chat_data.messages[roomId] = [];
  }

  const messageInfo: MessageInfo = {
    id: uuid(),
    message: message,
    type: 'message',
    user: userId,
    timestamp: new Date().toString(),
  };

  initial_chat_data.messages[roomId].push(messageInfo);

  return { isSuccess: true, messageInfo };
};
