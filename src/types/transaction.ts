export interface Transaction {
  id: number; // ID transaksi
  userId: number; // ID pengguna yang terkait dengan transaksi
  eventId: number; // ID event yang terkait dengan transaksi
  voucherId?: number | null; // Opsional, ID voucher yang digunakan
  couponId?: number | null; // Opsional, ID kupon yang digunakan
  amount: number; // Jumlah total yang harus dibayar
  ticketCount: number; // Jumlah tiket yang dibeli
  pointUse?: number; // Jumlah poin yang digunakan, opsional
  paymentProof?: string; // Bukti pembayaran (URL atau path)
  status: string; // Status dari transaksi (misalnya: waitingPayment, done)
  createdAt: string;
}
