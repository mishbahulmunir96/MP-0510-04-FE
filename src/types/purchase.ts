interface Purchase {
  id: number;
  event: {
    title: string;
  };
  ticketCount: number;
  amount: number;
  createdAt: string;
  status: string;
}
