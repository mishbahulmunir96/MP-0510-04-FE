"use client";
import useAxios from "@/hooks/useAxios";
import { Event } from "@/types/event";
import { useQuery } from "@tanstack/react-query";

const useGetEventsByOrganizer = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["eventsByOrganizer"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Event[]>("/events/organizer");
      return data || [];
    },
  });
};

export default useGetEventsByOrganizer;
