"use client";

import { Badge } from "@/components/ui/badge";
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
import useGetVouchers from "@/hooks/api/voucher/useGetVouchers";
import { format } from "date-fns";
import Link from "next/link";

const MyVouchersPage = () => {
  const { data, isLoading, error } = useGetVouchers();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error fetching vouchers: {error.message}</div>;

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
            <TableHead>Quantity</TableHead>
            <TableHead>Claimed</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Expired Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {(data || []).map((voucher) => (
            <TableRow key={voucher.id}>
              <TableCell className="font-medium">{voucher.id}</TableCell>
              <TableCell>
                <Badge variant="outline">{voucher.voucherCode}</Badge>
              </TableCell>
              <TableCell>{voucher.event?.title}</TableCell>
              <TableCell>{voucher.qty}</TableCell>
              <TableCell>{voucher.usedQty}</TableCell>
              <TableCell>Rp. {voucher.value.toFixed(0)}</TableCell>
              <TableCell>
                <span
                  className={
                    new Date(voucher.expDate) < new Date()
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {format(new Date(voucher.expDate), "dd MMM yyy")}
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
