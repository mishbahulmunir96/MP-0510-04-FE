"use client";

import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useForgotPassword from "@/hooks/api/auth/useForgotPassword";
import { useFormik } from "formik";
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
    <div className="px-2">
      <div className="container mx-auto mt-4 flex w-full justify-center">
        <Card className="w-[450px] p-6">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="mb-6 text-4xl font-extrabold text-slate-600">
              Enter your Email to reset your password
            </h1>
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

            <Button type="submit" className="mt-4 w-full" disabled={isPending}>
              {isPending ? "Loading..." : "Login"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
