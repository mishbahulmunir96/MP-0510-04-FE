"use client";

import InputField from "@/components/InputField";
import SignPrompt from "@/components/SignPrompt";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import useAuth from "@/hooks/api/auth/useAuth";
import useLogin from "@/hooks/api/auth/useLogin";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { LoginSchema } from "./schema";
import SignSideElement from "@/components/SignSideElement";
import SignTitle from "@/components/SignTitle";

const LoginPage = () => {
  useAuth();
  const { mutateAsync: login, isPending } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    //
    onSubmit: async (values) => {
      await login(values);
    },
  });
  return (
    <main className="h-screen w-full py-4 md:py-0">
      <div className="mx-auto flex h-full w-full">
        <SignSideElement className="w-[62%]" />

        <Card className="w-full items-center rounded-none border-none p-6 shadow-none md:my-auto md:w-[38%]">
          <form onSubmit={formik.handleSubmit}>
            <SignTitle title="Hello Again!" subTitle="Wellcome back" />

            <div className="mb-4">
              <InputField
                htmlFor="email"
                label="Email"
                type="email"
                placeholder="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                className={`${formik.values.email ? "bg-blue-50" : "bg-white"}`}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-sm text-red-600">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <InputField
                htmlFor="password"
                label="Password"
                type="password"
                placeholder="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                className={`${formik.values.password ? "bg-blue-50" : "bg-white"}`}
              />

              {formik.touched.password && formik.errors.password ? (
                <div className="text-sm text-red-600">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <div className="mb-6 flex justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Keep me sign in
                </label>
              </div>

              <div className="text-base font-medium text-slate-700 hover:text-slate-900">
                <Link href="/forgot-password">Forgot Password</Link>
              </div>
            </div>

            <Button
              type="submit"
              className="mt-4 w-full bg-blue-500 font-medium hover:bg-blue-600"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Login"}
            </Button>
          </form>

          <div className="my-4 flex w-full justify-center">
            <p>OR</p>
          </div>

          <div className="mb-4 flex justify-center gap-4 rounded-md border py-2">
            <div>
              <Image
                src="/images/google-icon.svg"
                width={20}
                height={20}
                alt="google icons"
              />
            </div>
            <p>Sign in with Google</p>
          </div>

          <SignPrompt
            message="Don't have account?"
            href="/register"
            text="Sign Up"
          />
        </Card>
      </div>
    </main>
  );
};

export default LoginPage;
