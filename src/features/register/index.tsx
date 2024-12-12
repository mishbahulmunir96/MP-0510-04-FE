"use client";

import InputField from "@/components/InputField";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { RegisterSchema } from "./schema";
import useRegister from "@/hooks/api/auth/useRegister";

const RegisterPage = () => {
  const { mutateAsync: register, isPending } = useRegister();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (value) => {
      await register(value);
    },
  });

  return (
    <main className="px-2">
      <div className="container mx-auto mt-4 flex w-full justify-center">
        <Card className="w-[450px] p-6">
          <div className="mb-6 w-auto rounded-md bg-blue-900 px-4 pb-4 pt-8">
            <Logo />
          </div>

          <form onSubmit={formik.handleSubmit}>
            <h1 className="mb-6 text-4xl font-extrabold text-slate-600">
              Sign in to <span className="font-bold text-blue-900">MAKÉT</span>
            </h1>

            <div className="grid grid-cols-2 gap-x-2">
              <div className="mb-2">
                <InputField
                  htmlFor="firstName"
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </div>

              <div className="mb-2">
                <InputField
                  htmlFor="lastName"
                  label="Last Name"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="col-span-2 mb-2">
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

              <div className="col-span-2 mb-2">
                <InputField
                  htmlFor="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  name="phoneNumber"
                  placeholder="081234567890"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.phoneNumber}
                  </div>
                ) : null}
              </div>

              <div className="col-span-2 mb-2">
                <InputField
                  htmlFor="password"
                  label="password"
                  type="password"
                  name="password"
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

              <div className="col-span-2 mb-2">
                <InputField
                  htmlFor="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
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

              <div className="col-span-2 mb-2">
                <InputField
                  htmlFor="referralCode"
                  label="Have referral code?"
                  type="text"
                  name="referralCode"
                  placeholder="Enter Referral Code"
                  onChange={formik.handleChange}
                  value={formik.values.referralCode}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <Button type="submit" className="mt-4 w-full" disabled={isPending}>
              {isPending ? "Loading..." : "Register"}
            </Button>
          </form>

          <div className="my-4 flex w-full justify-center">
            <p>OR</p>
          </div>

          <div className="mb-2 flex justify-center gap-4 rounded-md border py-2">
            <div>
              <Image
                src="/images/google-icon.svg"
                width={20}
                height={20}
                alt="google icons"
              />
            </div>
            <p>Sign up with Google</p>
          </div>

          <div className="font-medium">
            <p>
              Have account?{" "}
              <Link href="/login" className="text-blue-700 hover:font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default RegisterPage;
