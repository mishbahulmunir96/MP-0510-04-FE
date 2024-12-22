"use client";

import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { changePasswordSchema } from "../changePasswordSchema";
import useChangePassword from "@/hooks/api/auth/useChangePassword";

const PasswordProfile = () => {
  const { mutateAsync: changePassword, isPending } = useChangePassword();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      await changePassword(values);
    },
  });
  return (
    <main>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <InputField
              htmlFor="currentPassword"
              label="Current Password"
              type="password"
              placeholder="Current Password"
              onChange={formik.handleChange}
              value={formik.values.currentPassword}
              onBlur={formik.handleBlur}
            />

            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <div className="text-sm text-red-600">
                {formik.errors.currentPassword}
              </div>
            ) : null}
          </div>

          <div>
            <InputField
              htmlFor="newPassword"
              label="New Password"
              type="password"
              placeholder="New Password"
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              onBlur={formik.handleBlur}
            />

            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="text-sm text-red-600">
                {formik.errors.newPassword}
              </div>
            ) : null}
          </div>

          <div>
            <InputField
              htmlFor="confirmNewPassword"
              label="Confirm New Password"
              type="password"
              placeholder="Confirm New Password"
              onChange={formik.handleChange}
              value={formik.values.confirmNewPassword}
              onBlur={formik.handleBlur}
            />

            {formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword ? (
              <div className="text-sm text-red-600">
                {formik.errors.confirmNewPassword}
              </div>
            ) : null}
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "Save Change"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default PasswordProfile;
