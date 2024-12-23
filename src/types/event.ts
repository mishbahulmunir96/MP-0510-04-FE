export interface Event {
  id: number;
  name: string;
  userId: number;
  title: string;
  thumbnail: string;
  description: string;
  category: string;
  content: string;
  address: string;
  price: number;
  availableSeat: number;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
}
