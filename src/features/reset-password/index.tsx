"use client";

import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useResetPassword from "@/hooks/api/auth/useResetPassword";
import { useFormik } from "formik";
import { FC } from "react";
import { ResetPasswordSchema } from "./schema";

interface ResetPasswordPageProps {
  token: string;
}
const ResetPasswordPage: FC<ResetPasswordPageProps> = ({ token }) => {
  const { mutateAsync: resetPassword, isPending } = useResetPassword(token);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    //
    onSubmit: async (values) => {
      await resetPassword(values);
    },
  });
  return (
    <main className="px-2">
      <div className="container mx-auto mt-4 flex w-full justify-center">
        <Card className="w-[500px] p-6">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="mb-6 text-4xl font-extrabold text-slate-600">
              Reset Your Password
            </h1>
            <div className="mb-4">
              <InputField
                htmlFor="password"
                label="Password"
                type="password"
                placeholder="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />

              {formik.touched.password && formik.errors.password ? (
                <div className="text-sm text-red-600">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <InputField
                htmlFor="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="email"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-sm text-red-600">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>

            <Button type="submit" className="mt-4 w-full" disabled={isPending}>
              {isPending ? "Loading..." : "save"}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
