"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateEventPayload {
  title: string;
  category: string;
  description: string;
  content: string;
  thumbnail: File | null;
  startTime: Date;
  endTime: Date;
  address: string;
  price: number;
  availableSeat: number;
}

const useCreateEvent = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
      const createEventForm = new FormData();

      createEventForm.append("title", payload.title);
      createEventForm.append("category", payload.category);
      createEventForm.append("description", payload.description);
      createEventForm.append("content", payload.content);
      createEventForm.append("thumbnail", payload.thumbnail!);
      createEventForm.append("startTime", payload.startTime.toDateString());
      createEventForm.append("endTime", payload.endTime.toDateString());
      createEventForm.append("address", payload.address);
      createEventForm.append("price", payload.price.toString());
      createEventForm.append("availableSeat", payload.availableSeat.toString());

      const { data } = await axiosInstance.post("/events", createEventForm);
      return data;
    },
    onSuccess: () => {
      toast.success("Create Event success");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useCreateEvent;
