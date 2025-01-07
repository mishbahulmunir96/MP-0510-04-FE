// pages/transactions/components/TransactionsTable.tsx
"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/types/transaction";
import Image from "next/image";
import { useState } from "react";

interface TransactionsTableProps {
  transactions: Transaction[];
  onAccept: (transaction: Transaction) => void;
  onReject: (transaction: Transaction) => void;
  setSelectedTransaction: (transaction: Transaction) => void;
  notes: string;
  setNotes: (notes: string) => void;
  isUpdating: boolean;
}

const TransactionsTable = ({
  transactions,
  onAccept,
  onReject,
  setSelectedTransaction,
  notes,
  setNotes,
  isUpdating,
}: TransactionsTableProps) => {
  const [acceptTransaction, setAcceptTransaction] =
    useState<Transaction | null>(null);
  const [rejectTransaction, setRejectTransaction] =
    useState<Transaction | null>(null);

  const handleAccept = (transaction: Transaction) => {
    setAcceptTransaction(transaction);
  };

  const handleReject = (transaction: Transaction) => {
    setRejectTransaction(transaction);
  };

  const confirmAccept = () => {
    if (acceptTransaction) {
      onAccept(acceptTransaction);
      setAcceptTransaction(null);
      setNotes("");
    }
  };

  const confirmReject = () => {
    if (rejectTransaction) {
      onReject(rejectTransaction);
      setRejectTransaction(null);
      setNotes("");
    }
  };

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
                <TableCell>
                  {transaction.user.firstName} {transaction.user.lastName}
                </TableCell>
                <TableCell>{transaction.event.title}</TableCell>
                <TableCell>
                  {transaction.amount.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </TableCell>
                <TableCell>
                  <Badge>{transaction.status}</Badge>
                </TableCell>
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
                            src={transaction.paymentProof || ""}
                            alt="Payment Proof"
                            width={400}
                            height={300}
                            className="rounded-md"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    {transaction.status === "waitingConfirmation" && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleAccept(transaction)}
                            >
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
                              <Button
                                onClick={confirmAccept}
                                disabled={isUpdating}
                              >
                                {isUpdating ? (
                                  <>
                                    <LoadingSpinner />
                                    <p>Please wait</p>
                                  </>
                                ) : (
                                  "Confirm Accept"
                                )}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleReject(transaction)}
                            >
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
                                onClick={confirmReject}
                                disabled={isUpdating}
                              >
                                {isUpdating ? (
                                  <>
                                    <LoadingSpinner />
                                    <p>Please wait</p>
                                  </>
                                ) : (
                                  "Confirm Reject"
                                )}
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
                  <Badge>{transaction.status}</Badge>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Attendee:</span>{" "}
                  {transaction.user.firstName} {transaction.user.lastName}
                </p>
                <p>
                  <span className="font-medium">Event:</span>{" "}
                  {transaction.event.title}
                </p>
                <p>
                  <span className="font-medium">Amount:</span>{" "}
                  {transaction.amount.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
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
                        src={transaction.paymentProof || ""}
                        alt="Payment Proof"
                        width={400}
                        height={300}
                        className="rounded-md"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                {transaction.status === "waitingConfirmation" && (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          size="sm"
                          className="w-full"
                          onClick={() => handleAccept(transaction)}
                        >
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
                          <Button onClick={confirmAccept} className="w-full">
                            {isUpdating ? (
                              <>
                                <LoadingSpinner />
                                <p>Please wait</p>
                              </>
                            ) : (
                              "Confirm Accept"
                            )}
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
                          onClick={() => handleReject(transaction)}
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
                            onClick={confirmReject}
                            className="w-full"
                            disabled={isUpdating}
                          >
                            {isUpdating ? (
                              <>
                                <LoadingSpinner />
                                <p>Please wait</p>
                              </>
                            ) : (
                              "Confirm Reject"
                            )}
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
};

export default TransactionsTable;
