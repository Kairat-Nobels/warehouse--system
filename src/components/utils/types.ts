export interface Slot {
  _id: string;
  room: Room;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface SlotsResponse {
  data: Slot[];
  success: boolean;
  statusCode: number;
  message: string;
}

export interface Room {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  slots: Slot[];
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  imageUrl: string;
}

export interface RoomsResponse {
  data: Room[];
  success: boolean;
  statusCode: number;
  message: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Booking {
  _id: string;
  date: string;
  slots: Slot[];
  room: Room;
  user: string;
  totalAmount: number;
  isConfirmed: "confirmed" | "unconfirmed";
  isDeleted: boolean;
}
