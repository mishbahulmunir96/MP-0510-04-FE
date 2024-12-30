"use client";
import useAxios from "@/hooks/useAxios";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

const useGetTransaction = (id: number) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["transaction", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Transaction>(
        `/transactions/${id}`,
      );
      return data;
    },
  });
};

export default useGetTransaction;
