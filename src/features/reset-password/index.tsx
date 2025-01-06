"use client";

import InputField from "@/components/InputField";
import SignTitle from "@/components/SignTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useResetPassword from "@/hooks/api/auth/useResetPassword";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { ResetPasswordSchema } from "./schema";
import LinkHome from "@/components/LinkHome";

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
    onSubmit: async (values) => {
      await resetPassword(values);
    },
  });
  return (
    <main className="px-2">
      <LinkHome className="text-blue-600 hover:text-blue-700" />

      <div className="container mx-auto mt-20 flex w-full justify-center">
        <Card className="w-[500px] p-6">
          <form onSubmit={formik.handleSubmit}>
            <SignTitle title="Reset Your Password" />
            <div className="mb-4">
              <InputField
                htmlFor="password"
                label="Password"
                type="password"
                placeholder="Password"
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
                placeholder="Confirm Password"
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

            <Button
              type="submit"
              className="mt-4 w-full bg-blue-500 font-medium hover:bg-blue-600"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span className="ml-2">Please wait</span>
                  <p>Please wait</p>
                </>
              ) : (
                "Save Password"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
