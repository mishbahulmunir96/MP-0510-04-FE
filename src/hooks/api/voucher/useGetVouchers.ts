"use client";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const useGetVouchers = (userId: number, page: number, take: number) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["vouchers", userId, page],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/vouchers`, {
        params: { page, take },
      });
      return data || [];
    },
    enabled: !!userId,
  });
};

export default useGetVouchers;
