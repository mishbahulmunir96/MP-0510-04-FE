export interface Event {
  id: number;
  userId: number;
  title: string;
  thumbnail: string;
  category: string;
  content: string;
  address: string;
  price: number;
  availableSeat: number;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
}
