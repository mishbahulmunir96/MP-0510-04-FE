import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Mock data for vouchers
const vouchers = [
  {
    id: 1,
    code: "SUMMER2023",
    eventName: "Summer Music Festival",
    quantity: 100,
    claimed: 45,
    amount: 10,
    expiredDate: new Date("2023-08-31"),
  },
  {
    id: 2,
    code: "TECHCONF50",
    eventName: "Tech Conference 2023",
    quantity: 50,
    claimed: 20,
    amount: 50,
    expiredDate: new Date("2023-09-05"),
  },
  {
    id: 3,
    code: "ARTEXPO25",
    eventName: "International Art Expo",
    quantity: 200,
    claimed: 75,
    amount: 25,
    expiredDate: new Date("2023-10-15"),
  },
  // Add more mock vouchers as needed
];

const MyVouchersPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between">
        <h1 className="mb-5 text-2xl font-bold">Voucher List</h1>
        <Button>
          <Link href="/dashboard/my-event/create-voucher">Create Voucher</Link>
        </Button>
      </div>
      <Table>
        <TableCaption>A list of active vouchers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Voucher Code</TableHead>
            <TableHead>Event Name</TableHead>
            <TableHead>Quantity/Quota</TableHead>
            <TableHead>Claimed</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Expired Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vouchers.map((voucher) => (
            <TableRow key={voucher.id}>
              <TableCell className="font-medium">{voucher.id}</TableCell>
              <TableCell>
                <Badge variant="outline">{voucher.code}</Badge>
              </TableCell>
              <TableCell>{voucher.eventName}</TableCell>
              <TableCell>{voucher.quantity}</TableCell>
              <TableCell>{voucher.claimed}</TableCell>
              <TableCell>${voucher.amount.toFixed(2)}</TableCell>
              <TableCell>
                <span
                  className={
                    voucher.expiredDate < new Date()
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {voucher.expiredDate.toLocaleDateString()}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyVouchersPage;
