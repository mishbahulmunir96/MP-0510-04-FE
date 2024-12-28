"use client";

import { useState } from "react";
import Image from "next/image";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  mockTransactions,
  Transaction,
  getTransactionsByStatus,
} from "@/utils/eventData";

export default function TransactionManagement() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [notes, setNotes] = useState("");

  const handleAccept = (transaction: Transaction) => {
    const updatedTransactions = transactions.map((t) =>
      t.id === transaction.id
        ? { ...t, status: "approved" as const, notes }
        : t,
    );
    setTransactions(updatedTransactions);
    setNotes("");
  };

  const handleReject = (transaction: Transaction) => {
    const updatedTransactions = transactions.map((t) =>
      t.id === transaction.id
        ? { ...t, status: "rejected" as const, notes }
        : t,
    );
    setTransactions(updatedTransactions);
    setNotes("");
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
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <TransactionTable
                transactions={getTransactionsByStatus(transactions, "pending")}
                onAccept={handleAccept}
                onReject={handleReject}
                setSelectedTransaction={setSelectedTransaction}
                notes={notes}
                setNotes={setNotes}
              />
            </TabsContent>
            <TabsContent value="approved">
              <TransactionTable
                transactions={getTransactionsByStatus(transactions, "approved")}
                onAccept={handleAccept}
                onReject={handleReject}
                setSelectedTransaction={setSelectedTransaction}
                notes={notes}
                setNotes={setNotes}
              />
            </TabsContent>
            <TabsContent value="rejected">
              <TransactionTable
                transactions={getTransactionsByStatus(transactions, "rejected")}
                onAccept={handleAccept}
                onReject={handleReject}
                setSelectedTransaction={setSelectedTransaction}
                notes={notes}
                setNotes={setNotes}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
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
                src={selectedTransaction.paymentProof}
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
}

interface TransactionTableProps {
  transactions: Transaction[];
  onAccept: (transaction: Transaction) => void;
  onReject: (transaction: Transaction) => void;
  setSelectedTransaction: (transaction: Transaction) => void;
  notes: string;
  setNotes: (notes: string) => void;
}

function TransactionTable({
  transactions,
  onAccept,
  onReject,
  setSelectedTransaction,
  notes,
  setNotes,
}: TransactionTableProps) {
  return (
    <>
      {/* Table view for medium screens and up */}
      <div className="hidden md:block">
        <Table>
          <TableCaption>A list of payment transactions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Attendee</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.attendeeName}</TableCell>
                <TableCell>{transaction.eventName}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedTransaction(transaction)}
                        >
                          View Proof
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Payment Proof</DialogTitle>
                          <DialogDescription>
                            Transaction ID: {transaction.id}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <Image
                            src={transaction.paymentProof}
                            alt="Payment Proof"
                            width={400}
                            height={300}
                            className="rounded-md"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    {transaction.status === "pending" && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="default" size="sm">
                              Accept
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Accept Transaction</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to accept this
                                transaction?
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="notes">Notes (optional)</Label>
                                <Input
                                  id="notes"
                                  value={notes}
                                  onChange={(e) => setNotes(e.target.value)}
                                  placeholder="Add any notes here..."
                                />
                              </div>
                              <Button onClick={() => onAccept(transaction)}>
                                Confirm Accept
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              Reject
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reject Transaction</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to reject this
                                transaction?
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="notes">
                                  Reason for rejection
                                </Label>
                                <Input
                                  id="notes"
                                  value={notes}
                                  onChange={(e) => setNotes(e.target.value)}
                                  placeholder="Provide a reason for rejection..."
                                  required
                                />
                              </div>
                              <Button
                                variant="destructive"
                                onClick={() => onReject(transaction)}
                              >
                                Confirm Reject
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Card view for small screens */}
      <div className="space-y-4 md:hidden">
        {transactions.map((transaction) => (
          <Card key={transaction.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>ID: {transaction.id}</span>
                <span className="text-sm font-normal">
                  {transaction.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Attendee:</span>{" "}
                  {transaction.attendeeName}
                </p>
                <p>
                  <span className="font-medium">Event:</span>{" "}
                  {transaction.eventName}
                </p>
                <p>
                  <span className="font-medium">Amount:</span> $
                  {transaction.amount.toFixed(2)}
                </p>
              </div>
              <div className="mt-4 space-y-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      View Proof
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Payment Proof</DialogTitle>
                      <DialogDescription>
                        Transaction ID: {transaction.id}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <Image
                        src={transaction.paymentProof}
                        alt="Payment Proof"
                        width={400}
                        height={300}
                        className="rounded-md"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                {transaction.status === "pending" && (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="default" size="sm" className="w-full">
                          Accept
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Accept Transaction</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to accept this transaction?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="notes">Notes (optional)</Label>
                            <Input
                              id="notes"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              placeholder="Add any notes here..."
                            />
                          </div>
                          <Button
                            onClick={() => onAccept(transaction)}
                            className="w-full"
                          >
                            Confirm Accept
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full"
                        >
                          Reject
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reject Transaction</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to reject this transaction?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="notes">Reason for rejection</Label>
                            <Input
                              id="notes"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              placeholder="Provide a reason for rejection..."
                              required
                            />
                          </div>
                          <Button
                            variant="destructive"
                            onClick={() => onReject(transaction)}
                            className="w-full"
                          >
                            Confirm Reject
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
