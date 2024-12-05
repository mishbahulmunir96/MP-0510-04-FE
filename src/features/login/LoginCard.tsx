"use client";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import InputField from "@/components/InputField";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useFormik } from "formik";
import Logo from "@/components/Logo";
YupPassword(Yup);

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required").email(),
  password: Yup.string()
    .required("Password is required")
    .min(8)
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
});

const LoginCard = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    //
    onSubmit: (value) => {
      alert(JSON.stringify(value));
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
                htmlfor="email"
                label="Email"
                type="email"
                id="email"
                placeholder="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <InputField
                htmlfor="password"
                label="Password"
                type="password"
                id="password"
                placeholder="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
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
                <p>Forgot Password</p>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Sign In
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
              <Link href="" className="text-blue-700 hover:font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginCard;
