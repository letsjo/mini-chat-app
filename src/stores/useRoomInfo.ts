import { create } from 'zustand';

import { MessageInfo, RoomInfoDetail } from '@/types';

interface CurrentRoomStateInfo {
  roomInfo: RoomInfoDetail;
  messages: MessageInfo[];
}

interface CurrentRoomStateActions {
  setRoomInfo: (chats: RoomInfoDetail) => void;
  setMessages: (messages: MessageInfo[]) => void;
  sendNewMessage: (message: MessageInfo) => void;
}

const useRoomInfo = create<CurrentRoomStateInfo & CurrentRoomStateActions>((set) => ({
  roomInfo: { id: '', title: '', profile: '', members: [], last_timestamp: '' },
  messages: [],
  setRoomInfo: (roomInfo) => set({ roomInfo }),
  setMessages: (messages: MessageInfo[]) => set({ messages }),
  sendNewMessage: (message: MessageInfo) =>
    set((prev) => {
      return { messages: [...prev.messages, message] };
    }),
}));

export default useRoomInfo;
