export interface Transaction {
  id: number;
  userId: number;
  eventId: number;
  voucherId?: number | null;
  couponId?: number | null;
  amount: number; // Jumlah total yang harus dibayar
  ticketCount: number; // Jumlah tiket yang dibeli
  pointUse?: number; // Jumlah poin yang digunakan, opsional
  paymentProof?: string; // Bukti pembayaran (URL atau path)
  status: string; // Status dari transaksi (misalnya: waitingPayment, done)
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
  event: {
    title: string;
  };
}
