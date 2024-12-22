import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types/event";


const useGetEvent = (id: number) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Event>( `/events/${id}` );      

      return data;
    },
  });
};

export default useGetEvent;
