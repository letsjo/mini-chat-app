import { create } from 'zustand';

import { RoomInfo, UserInfo } from '@/types';

interface UserInfoState {
  rooms: RoomInfo[];
  userInfo: UserInfo;
}

interface UserInfoActions {
  setRooms: (chats: RoomInfo[]) => void;
  setUserInfo: (userinfo: UserInfo) => void;
  leaveRoom: (roomId: string) => void;
  logout: () => void;
}

const defaultState = { id: '', profile: '', nickname: '', chats: [] } as UserInfo;

const useUserInfo = create<UserInfoState & UserInfoActions>((set) => ({
  rooms: [],
  userInfo: defaultState,
  setRooms: (rooms) => set({ rooms }),
  setUserInfo: (userInfo: UserInfo) => {
    set({ userInfo });
  },
  leaveRoom: (roomId: string) => {
    set((prev) => {
      const newRooms = prev.rooms.filter((room) => room.id !== roomId);
      return { rooms: newRooms };
    });
  },
  logout: () => {
    set({ userInfo: defaultState });
  },
}));

export default useUserInfo;
