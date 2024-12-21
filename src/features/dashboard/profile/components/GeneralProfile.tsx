"use client";

import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useUpdateUser from "@/hooks/api/user/useUpdateUser";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { updateProfileSchema } from "../schema";
import { DateInput } from "../../components/DateInput";
import GenderRadioGroup from "./GenderRadioGroup";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const GeneralProfile = () => {
  const user = useSelector((state: RootState) => state.user);
  const userId = user.id;

  const { mutateAsync: updateUser, isPending } = useUpdateUser();
  const [selectedImage, setSelectedImage] = useState(user.profilePicture || "");
  const profilePictureRef = useRef<HTMLInputElement>(null);

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
      await updateUser({ id: userId, payload: values });
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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <div className="relative h-32 w-32 rounded-full border-2 border-red-400">
            <Image
              src={selectedImage}
              alt="profile picture"
              fill
              className="object-cover"
            />
          </div>

          <InputField
            htmlFor="profilePicture"
            label="Change Picture"
            type="file"
            accept="image/*"
            ref={profilePictureRef}
            onChange={onChangeProfilePicture}
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
            />
          </div>

          <div className="col-span-2">
            <Label className="text-lg">Gender</Label>
            <GenderRadioGroup
              value={formik.values.gender}
              onChange={(value) => formik.setFieldValue("gender", value)}
            />
          </div>

          <div className="col-span-2 flex flex-col">
            <Label className="text-lg">Date Of Birth</Label>
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
            <Textarea
              name="address"
              placeholder="Enter address"
              rows={3}
              style={{ resize: "none" }}
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Save Change"}
        </Button>
      </form>
    </div>
  );
};

export default GeneralProfile;
