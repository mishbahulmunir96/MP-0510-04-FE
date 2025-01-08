"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import { Transaction } from "@/types/transaction";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppSelector } from "@/redux/hooks";
import PaginationSection from "@/components/PaginationSection";
import useGetTransactionByOrganizer from "@/hooks/api/transaction/useGetTransactionsByOrganizer";
import useUpdateTransactionStatus from "@/hooks/api/transaction/useUpdateTransactionstatus";

const TransactionsPage = () => {
  const user = useAppSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [take] = useState(10);
  const {
    data: transactions = [],
    isLoading,
    isError,
  } = useGetTransactionByOrganizer(user.id, page, take);

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [notes, setNotes] = useState("");

  const {
    mutate: updateTransactionStatus,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateTransactionStatus();

  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>Error loading transactions</div>;

  const filterTransactionsByStatus = (status: string[]) => {
    return transactions.data.filter((transaction: Transaction) =>
      status.includes(transaction.status),
    );
  };

  const handleAccept = async (transaction: Transaction) => {
    try {
      updateTransactionStatus({
        transactionId: transaction.id,
        status: "done",
        notes,
      });
    } catch (error) {
      console.error("Error accepting transaction:", error);
    }
  };

  const handleReject = async (transaction: Transaction) => {
    try {
      updateTransactionStatus({
        transactionId: transaction.id,
        status: "rejected",
        notes,
      });
    } catch (error) {
      console.error("Error rejecting transaction:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-3xl font-bold">Transaction Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>
            Manage incoming payment transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Failed</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <TransactionsTable
                transactions={filterTransactionsByStatus([
                  "waitingPayment",
                  "waitingConfirmation",
                ])}
                onAccept={handleAccept}
                onReject={handleReject}
                setSelectedTransaction={setSelectedTransaction}
                notes={notes}
                setNotes={setNotes}
                isUpdating={isUpdating}
              />
            </TabsContent>
            <TabsContent value="approved">
              <TransactionsTable
                transactions={filterTransactionsByStatus(["done"])}
                onAccept={handleAccept}
                onReject={handleReject}
                setSelectedTransaction={setSelectedTransaction}
                notes={notes}
                setNotes={setNotes}
                isUpdating={isUpdating}
              />
            </TabsContent>
            <TabsContent value="rejected">
              <TransactionsTable
                transactions={filterTransactionsByStatus([
                  "rejected",
                  "expired",
                  "cancelled",
                ])}
                onAccept={handleAccept}
                onReject={handleReject}
                setSelectedTransaction={setSelectedTransaction}
                notes={notes}
                setNotes={setNotes}
                isUpdating={isUpdating}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {transactions && (
        <PaginationSection
          page={page}
          take={take}
          total={transactions.meta.total}
          onChangePage={handlePageChange}
        />
      )}

      {selectedTransaction && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="hidden">Open</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Payment Proof</DialogTitle>
              <DialogDescription>
                Transaction ID: {selectedTransaction.id}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <Image
                src={selectedTransaction.paymentProof || ""}
                alt="Payment Proof"
                width={400}
                height={300}
                className="rounded-md"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TransactionsPage;
