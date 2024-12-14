import { axiosInstance } from "@/lib/axios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types/event";

interface GetEventsQuery extends PaginationQueries {}

const useGetEvents = (queries: GetEventsQuery) => {
  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Event>>(
        "/blogs",
        { params: queries },
      );

      return data;
    },
  });
};

export default useGetEvents;
