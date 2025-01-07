"use client";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const useGetAttendeesByEvent = (
  eventId: number,
  userId: number,
  page: number,
  take: number,
) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["attendees", eventId, userId, page],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/attendees/${eventId}`, {
        params: { page, take },
      });
      return data || [];
    },
    enabled: !!userId,
  });
};

export default useGetAttendeesByEvent;
