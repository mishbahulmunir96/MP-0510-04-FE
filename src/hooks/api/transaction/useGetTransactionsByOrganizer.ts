"use client";
import useAxios from "@/hooks/useAxios";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

const useGetTransactionByOrganizer = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["TransactionsByOrganizer"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Transaction[]>(
        "/transactions/byOrg",
      );
      return data || [];
    },
  });
};

export default useGetTransactionByOrganizer;
