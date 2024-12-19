import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const useGetUser = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>(`/users/${id}`);
      return data;
    },
  });
};

export default useGetUser;
