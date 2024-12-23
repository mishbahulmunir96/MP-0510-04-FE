"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAxios from "../../useAxios"; // Pastikan path ini sesuai dengan proyek Anda

interface UpdateEventPayload {
  title?: string;
  name?: string;
  description?: string;
  content?: string;
  category?: string;
  address?: string;
  startTime?: string;
  endTime?: string;
  availableSeat?: number;
  price?: number;
  thumbnail?: File | null; // Mengizinkan untuk mengupload file gambar
}

const useUpdateEvent = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateEventPayload;
    }) => {
      const updateEventForm = new FormData();

      if (payload.title) updateEventForm.append("title", payload.title);
      if (payload.name) updateEventForm.append("name", payload.name);
      if (payload.description)
        updateEventForm.append("description", payload.description);
      if (payload.content) updateEventForm.append("content", payload.content);
      if (payload.category)
        updateEventForm.append("category", payload.category);
      if (payload.address) updateEventForm.append("address", payload.address);
      if (payload.startTime)
        updateEventForm.append("startTime", payload.startTime);
      if (payload.endTime) updateEventForm.append("endTime", payload.endTime);
      if (payload.availableSeat)
        updateEventForm.append("availableSeat", String(payload.availableSeat));
      if (payload.price) updateEventForm.append("price", String(payload.price));
      if (payload.thumbnail)
        updateEventForm.append("thumbnail", payload.thumbnail);

      const { data } = await axiosInstance.patch(
        `/events/update-event/${id}`,
        updateEventForm,
      );

      return data;
    },
    onSuccess: async (data) => {
      toast.success("Event updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/events"); // Arahkan ke halaman yang sesuai setelah sukses
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || "Failed to update event."); // Pesan default
    },
  });
};

export default useUpdateEvent;
