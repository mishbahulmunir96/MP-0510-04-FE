"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/redux/hooks";
import useGetPurchaseHistory from "@/hooks/api/transaction/useGetPurchaseHistory";
import PaginationSection from "@/components/PaginationSection";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";

const PurchasesHistoryPage = () => {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [take] = useState(10);

  const { data, isLoading, isError } = useGetPurchaseHistory(
    user.id,
    page,
    take,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "waitingPayment":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Menangani state loading
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Menangani state error
  if (isError) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="mb-5 text-3xl font-bold">Purchase History</h1>
        <div className="flex h-[350px] items-center justify-center">
          <h1 className="text-center">Failed to load purchase history</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-3xl font-bold">Purchase History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Purchases</CardTitle>
          <CardDescription>
            A list of all your event ticket purchases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent purchases</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Event Date</TableHead>
                <TableHead>Tickets</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((purchase: Purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>{purchase.event.title}</TableCell>
                  <TableCell>
                    {format(new Date(purchase.createdAt), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell>{purchase.ticketCount}</TableCell>
                  <TableCell>${purchase.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(purchase.status)}>
                      {purchase.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/transaction/${purchase.id}`)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {data && (
        <PaginationSection
          page={page}
          take={take}
          total={data.meta.total}
          onChangePage={handlePageChange}
        />
      )}
    </div>
  );
};

export default PurchasesHistoryPage;
