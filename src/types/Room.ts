import { MemberInfo } from './User';

interface Room {
  id: string;
  title: string;
  profile: string;
  last_timestamp?: string;
  last_message?: string;
}

export interface RoomInfo extends Room {
  users: string[];
}

export interface RoomInfoDetail extends Room {
  members: MemberInfo[];
}

export interface MessageInfo {
  id: any;
  type: string;
  user: string;
  message: string;
  timestamp: string;
}
