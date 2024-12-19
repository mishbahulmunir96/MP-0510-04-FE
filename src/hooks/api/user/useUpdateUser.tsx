"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAxios from "../useAxios";

interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
  birthDate?: string;
  address?: string;
  profilePicture?: File | null;
}

const useUpdateUser = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateUserPayload;
    }) => {
      const updateUserForm = new FormData();

      if (payload.firstName)
        updateUserForm.append("firstName", payload.firstName);
      if (payload.lastName) updateUserForm.append("lastName", payload.lastName);
      if (payload.email) updateUserForm.append("email", payload.email);
      if (payload.phoneNumber)
        updateUserForm.append("phoneNumber", payload.phoneNumber);
      if (payload.gender) updateUserForm.append("gender", payload.gender);
      if (payload.birthDate)
        updateUserForm.append("birthDate", payload.birthDate);
      if (payload.address) updateUserForm.append("address", payload.address);
      if (payload.profilePicture)
        updateUserForm.append("profilePicture", payload.profilePicture);

      const { data } = await axiosInstance.patch(
        `/users/${id}`,
        updateUserForm,
      );
      return data;
    },
    onSuccess: async (data) => {
      toast.success("User updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
      toast.error(error.response?.data.errors);
    },
  });
};

export default useUpdateUser;
