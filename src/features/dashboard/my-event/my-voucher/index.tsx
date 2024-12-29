"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  if (isLoading) return <LoadingSpinner />;

  if (error) return <div>Error fetching vouchers: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <h1 className="mb-4 text-2xl font-bold sm:mb-0">Voucher List</h1>
        <Button className="w-full bg-blue-500 font-medium hover:bg-blue-600 sm:w-auto">
          <Link href="/dashboard/my-event/create-voucher">Create Voucher</Link>
        </Button>
      </div>

      <div className="hidden md:block">
        {" "}
        {/* Table view for medium screens and up */}
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>A list of active vouchers</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Voucher Code</TableHead>
                <TableHead>Event Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Claimed</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Expired Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((voucher) => (
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
                        {format(new Date(voucher.expDate), "dd MMM yyyy")}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">
                    No vouchers available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="space-y-4 md:hidden">
        {" "}
        {/* Card view for small screens */}
        {data && data.length > 0 ? (
          data.map((voucher) => (
            <Card key={voucher.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <Badge variant="outline">{voucher.voucherCode}</Badge>
                  <span className="text-sm font-normal">ID: {voucher.id}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="font-medium">Event Name</dt>
                    <dd>{voucher.event?.title}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Quantity</dt>
                    <dd>{voucher.qty}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Claimed</dt>
                    <dd>{voucher.usedQty}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Value</dt>
                    <dd>Rp. {voucher.value.toFixed(0)}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="font-medium">Expired Date</dt>
                    <dd
                      className={
                        new Date(voucher.expDate) < new Date()
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {format(new Date(voucher.expDate), "dd MMM yyyy")}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-6 text-center text-gray-500">
              No vouchers available
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyVouchersPage;
