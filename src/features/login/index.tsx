"use client";

import InputField from "@/components/InputField";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { LoginSchema } from "./schema";
import useLogin from "@/hooks/api/auth/useLogin";

const LoginPage = () => {
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
    <div className="px-2">
      <div className="container mx-auto mt-4 flex w-full justify-center">
        <Card className="w-[450px] p-6">
          <div className="mb-6 w-auto rounded-md bg-blue-900 px-4 pb-4 pt-8">
            <Logo />
          </div>

          <form onSubmit={formik.handleSubmit}>
            <h1 className="mb-6 text-4xl font-extrabold text-slate-600">
              Sign in to <span className="font-bold text-blue-900">MAKÉT</span>
            </h1>
            <div className="mb-4">
              <InputField
                htmlFor="email"
                label="Email"
                type="email"
                name="email"
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

            <div className="mb-4">
              <InputField
                htmlFor="password"
                label="Password"
                type="password"
                name="password"
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

              <div className="">
                <Link href="/forgot-password">Forgot Password</Link>
              </div>
            </div>

            <Button type="submit" className="mt-4 w-full" disabled={isPending}>
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

          <div className="font-medium">
            <p>
              Don't have account?{" "}
              <Link
                href="/register"
                className="text-blue-700 hover:font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
