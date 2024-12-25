"use client";

import InputField from "@/components/InputField";
import SignPrompt from "@/components/SignPrompt";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useAuth from "@/hooks/api/auth/useAuth";
import useRegister from "@/hooks/api/auth/useRegister";
import { useFormik } from "formik";
import Image from "next/image";
import { RegisterSchema } from "./schema";
import SignSideElement from "@/components/SignSideElement";
import SignTitle from "@/components/SignTitle";

const RegisterPage = () => {
  // useAuth();

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
    <main className="w-full py-4 md:py-0">
      <div className="mx-auto flex h-full w-full">
        <div className="relative hidden h-screen md:block md:w-[62%]">
          <SignSideElement className="fixed w-[62%]" />
        </div>

        <Card className="w-full rounded-none border-none p-6 md:relative md:w-[38%]">
          <form onSubmit={formik.handleSubmit}>
            <SignTitle title="Hello!" subTitle="Sign up to get started" />

            <div className="grid grid-cols-2 gap-x-2">
              <div className="mb-2">
                <InputField
                  htmlFor="firstName"
                  label="First Name"
                  type="text"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                  className={`${formik.values.firstName ? "bg-blue-50" : "bg-white"}`}
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
                  placeholder="Last Name"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                  className={`${formik.values.lastName ? "bg-blue-50" : "bg-white"}`}
                />
              </div>

              <div className="col-span-2 mb-2">
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

              <div className="col-span-2 mb-2">
                <InputField
                  htmlFor="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  placeholder="081234567890"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  onBlur={formik.handleBlur}
                  className={`${formik.values.phoneNumber ? "bg-blue-50" : "bg-white"}`}
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
                  label="Password"
                  type="password"
                  placeholder="Password"
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

              <div className="col-span-2 mb-2">
                <InputField
                  htmlFor="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                  className={`${formik.values.confirmPassword ? "bg-blue-50" : "bg-white"}`}
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
                  placeholder="Enter Referral Code"
                  onChange={formik.handleChange}
                  value={formik.values.referralCode}
                  onBlur={formik.handleBlur}
                  className={`${formik.values.referralCode ? "bg-blue-50" : "bg-white"}`}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-4 w-full bg-blue-500 font-medium hover:bg-blue-600"
              disabled={isPending}
            >
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

          <SignPrompt message="Have an account?" href="/login" text="Sign In" />
        </Card>
      </div>
    </main>
  );
};

export default RegisterPage;
