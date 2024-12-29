"use client";

import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useForgotPassword from "@/hooks/api/auth/useForgotPassword";
import { useFormik } from "formik";
import { ForgotPasswordSchema } from "./schema";
import SignTitle from "@/components/SignTitle";
import Link from "next/link";
import LinkHome from "@/components/LinkHome";

const ForgotPasswordPage = () => {
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    //
    onSubmit: async (values) => {
      await forgotPassword(values);
    },
  });
  return (
    <div className="px-2">
      <LinkHome className="text-blue-600 hover:text-blue-700" />
      <div className="container mx-auto mt-20 flex w-full justify-center">
        <Card className="w-[450px] p-6">
          <form onSubmit={formik.handleSubmit}>
            <SignTitle title="Enter your email to reset password" />
            <div className="mb-4">
              <InputField
                htmlFor="email"
                label="Email"
                type="email"
                placeholder="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-sm text-red-600">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <Button
              type="submit"
              className="mt-4 w-full bg-blue-500 font-medium hover:bg-blue-600"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Send Email"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
