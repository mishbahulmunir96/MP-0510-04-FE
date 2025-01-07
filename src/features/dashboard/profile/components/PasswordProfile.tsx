"use client";

import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { changePasswordSchema } from "./changePasswordSchema";
import { useState } from "react";
import ModalConfirmation from "@/components/ModalConfirmation";
import { Loader2 } from "lucide-react";
import useChangePassword from "@/hooks/api/auth/useChangePassword";

const PasswordProfile = () => {
  const { mutateAsync: changePassword, isPending } = useChangePassword();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      try {
        await changePassword(values);
        setIsDialogOpen(false);
        setError("");
      } catch (error) {
        setError("Failed to update profile. Please try again.");
      }
    },
  });
  return (
    <main>
      <div>
        <div>
          <h1 className="my-4 text-xl font-semibold text-slate-800">
            Change Password
          </h1>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 md:w-1/2">
            <InputField
              htmlFor="currentPassword"
              label="Current Password"
              type="password"
              placeholder="Current Password"
              onChange={formik.handleChange}
              value={formik.values.currentPassword}
              onBlur={formik.handleBlur}
              className={`font-medium text-black ${formik.values.currentPassword ? "bg-blue-50" : "bg-white"}`}
            />

            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <div className="text-sm text-red-600">
                {formik.errors.currentPassword}
              </div>
            ) : null}
          </div>
          <div className="mb-4 md:w-1/2">
            <InputField
              htmlFor="newPassword"
              label="New Password"
              type="password"
              placeholder="New Password"
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              onBlur={formik.handleBlur}
              className={`font-medium text-black ${formik.values.newPassword ? "bg-blue-50" : "bg-white"}`}
            />

            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="text-sm text-red-600">
                {formik.errors.newPassword}
              </div>
            ) : null}
          </div>
          <div className="mb-4 md:w-1/2">
            <InputField
              htmlFor="confirmNewPassword"
              label="Confirm New Password"
              type="password"
              placeholder="Confirm New Password"
              onChange={formik.handleChange}
              value={formik.values.confirmNewPassword}
              onBlur={formik.handleBlur}
              className={`font-medium text-black ${formik.values.confirmNewPassword ? "bg-blue-50" : "bg-white"}`}
            />

            {formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword ? (
              <div className="text-sm text-red-600">
                {formik.errors.confirmNewPassword}
              </div>
            ) : null}
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}{" "}
          {/* Display error message */}
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
            description="This action will save all changes made to your password."
            onConfirm={formik.handleSubmit}
            confirmText="Yes"
            cancelText="Cancel"
          />
        </form>
      </div>
    </main>
  );
};

export default PasswordProfile;
