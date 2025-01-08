export interface Transaction {
  id: number;
  userId: number;
  eventId: number;
  voucherId?: number | null;
  couponId?: number | null;
  amount: number;
  ticketCount: number;
  pointUse?: number;
  paymentProof?: string;
  status: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
  event: {
    title: string;
  };
}
