"use client";
import useAxios from "@/hooks/useAxios";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

const useGetTransactionByOrganizer = (
  userId: number,
  page: number,
  take: number,
) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["TransactionsByOrganizer", userId, page],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/transactions/organizer`, {
        params: { page, take },
      });
      return data || [];
    },
    enabled: !!userId,
  });
};

export default useGetTransactionByOrganizer;
