"use client";

import InputField from "@/components/InputField";
import LinkHome from "@/components/LinkHome";
import SignTitle from "@/components/SignTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useForgotPassword from "@/hooks/api/auth/useForgotPassword";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { ForgotPasswordSchema } from "./schema";

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
    <main className="px-2">
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
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span className="ml-2">Please wait</span>
                </>
              ) : (
                "Send Email"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
