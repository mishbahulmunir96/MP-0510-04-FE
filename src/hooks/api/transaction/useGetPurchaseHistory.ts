"use client";

import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";

const useGetPurchaseHistory = (userId: number, page: number, take: number) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["purchaseHistory", userId, page],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `transactions/purchase-history`,
        {
          params: { page, take },
        },
      );
      return data;
    },
    enabled: !!userId,
  });
};

export default useGetPurchaseHistory;
