"use client";

import { FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  status: string;
}

const TransactionsPage: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { axiosInstance } = useAxios();
  const router = useRouter();

  const { data, isLoading, error } = useQuery<Transaction[], Error>({
    queryKey: ["transaction"],
    queryFn: async () => {
      const response = await axiosInstance.get("/transactions");
      return response.data;
    }
  });

  useEffect(() => {
    if (data) {
      setTransactions(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error("Failed to load transactions.");
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Your Transactions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="shadow-lg">
            <div className="p-4">
              <h2 className="text-xl font-semibold">{transaction.title}</h2>
              <p>Amount: Rp{transaction.amount.toLocaleString()}</p>
              <p>Status: {transaction.status}</p>
              <Button
                onClick={() => router.push(`/transactions/${transaction.id}`)}
                className="mt-4"
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TransactionsPage;
