export interface Voucher {
  id: number;
  voucherCode: string;
  qty: number;
  usedQty: number;
  value: number;
  expDate: Date;
}
