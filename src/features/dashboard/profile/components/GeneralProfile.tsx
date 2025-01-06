"use client";

import InputField from "@/components/InputField";
import ModalConfirmation from "@/components/ModalConfirmation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useUpdateUser from "@/hooks/api/user/useUpdateUser";
import { useAppSelector } from "@/redux/hooks";
import { updateUserAction } from "@/redux/slices/userSlices";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { DateInput } from "../../components/DateInput";
import { updateProfileSchema } from "./updateProfileSchema";
import GenderRadioGroup from "./GenderRadioGroup";

const GeneralProfile = () => {
  const user = useAppSelector((state) => state.user);
  const userId = user.id;

  const { mutateAsync: updateUser, isPending } = useUpdateUser();
  const [selectedImage, setSelectedImage] = useState(user.profilePicture || "");
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user-storage");
    if (storedUser) {
      dispatch(updateUserAction(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      gender: user.gender || "",
      birthDate: user.birthDate || "",
      address: user.address || "",
      profilePicture: null,
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      try {
        const updatedUser = await updateUser({ id: userId, payload: values });
        dispatch(updateUserAction(updatedUser));
        localStorage.setItem("user-storage", JSON.stringify(updatedUser));
        setIsDialogOpen(false);
        setError("");
      } catch (error) {
        setError("Failed to update profile. Please try again.");
      }
    },
  });

  const onChangeProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("profilePicture", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeProfilePicture = () => {
    formik.setFieldValue("profilePicture", null);
    setSelectedImage("");
    if (profilePictureRef.current) {
      profilePictureRef.current.value = "";
    }
  };

  return (
    <main>
      <div>
        <h1 className="my-4 text-xl font-semibold text-slate-800">
          Personal Data
        </h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <div className="my-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-red-400">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={selectedImage}
                alt="Profile Picture"
                className="h-32 w-32"
              />
              <AvatarFallback>
                <Image
                  src="https://purwadhika.com/dashboard/static/icons/ic_profile.svg"
                  alt="fallback"
                  fill
                  className="object-cover"
                />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex w-[340px] items-end">
            <InputField
              htmlFor="profilePicture"
              label="Change Picture"
              type="file"
              accept="image/*"
              ref={profilePictureRef}
              onChange={onChangeProfilePicture}
              className="flex w-60 items-center justify-center"
            />
            {selectedImage && (
              <div>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={removeProfilePicture}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <InputField
              htmlFor="firstName"
              label="First Name"
              type="text"
              placeholder="First Name"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              onBlur={formik.handleBlur}
              className={`font-medium text-black ${formik.values.firstName ? "bg-blue-50" : "bg-white"}`}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-sm text-red-600">
                {formik.errors.firstName}
              </div>
            ) : null}
          </div>

          <div>
            <InputField
              htmlFor="lastName"
              label="Last Name"
              type="text"
              placeholder="Last Name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              onBlur={formik.handleBlur}
              className={`font-medium text-black ${formik.values.lastName ? "bg-blue-50" : "bg-white"}`}
            />
          </div>

          <div>
            <InputField
              htmlFor="email"
              label="Email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              className={`font-medium text-black ${formik.values.email ? "bg-blue-50" : "bg-white"}`}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-sm text-red-600">{formik.errors.email}</div>
            ) : null}
          </div>

          <div>
            <InputField
              htmlFor="phoneNumber"
              label="Phone Number"
              type="tel"
              placeholder="Phone Number"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              onBlur={formik.handleBlur}
              className={`font-medium text-black ${formik.values.phoneNumber ? "bg-blue-50" : "bg-white"}`}
            />
          </div>

          <div className="col-span-2">
            <Label className="text-base text-slate-700">Gender</Label>
            <GenderRadioGroup
              value={formik.values.gender}
              onChange={(value) => formik.setFieldValue("gender", value)}
            />
          </div>

          <div className="col-span-2 flex flex-col">
            <Label className="my-2 text-base text-slate-700">
              Date Of Birth
            </Label>
            <DateInput
              value={formik.values.birthDate}
              onChange={(date) => formik.setFieldValue("birthDate", date)}
            />

            {formik.touched.birthDate && formik.errors.birthDate ? (
              <div className="text-sm text-red-600">
                {formik.errors.birthDate}
              </div>
            ) : null}
          </div>

          <div className="col-span-2">
            <Label className="text-base text-slate-700">Address</Label>
            <Textarea
              name="address"
              placeholder="Enter address"
              rows={3}
              style={{ resize: "none" }}
              value={formik.values.address}
              onChange={formik.handleChange}
              className={`my-2 font-medium text-black ${formik.values.firstName ? "bg-blue-50" : "bg-white"}`}
            />
          </div>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}{" "}
        <div>
          <Button
            type="button"
            disabled={isPending}
            onClick={() => setIsDialogOpen(true)}
            className="bg-blue-500 font-medium hover:bg-blue-600"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                <span className="ml-2">Please wait</span>
              </>
            ) : (
              "Save Change"
            )}
          </Button>
          <ModalConfirmation
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            title="Are you absolutely sure?"
            description="This action will save all changes made to your profile."
            onConfirm={formik.handleSubmit}
            confirmText="Yes"
            cancelText="Cancel"
          />
        </div>
      </form>
    </main>
  );
};

export default GeneralProfile;
