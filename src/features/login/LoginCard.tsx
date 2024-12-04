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
          <div className="text-3xl font-bold">LOGO</div>

          <form onSubmit={formik.handleSubmit}>
            <h1>Sign In to TitikTitik</h1>
            <InputField
              htmlfor="email"
              label="email"
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

            <InputField
              htmlfor="password"
              label="password"
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

            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Keep me sign in
                </label>
              </div>

              <div>
                <p>Forgot Password</p>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="flex w-full justify-center">
            <p>OR</p>
          </div>

          <div className="flex justify-center gap-4 rounded-md border py-2">
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

          <div>
            <p>
              Don't have account? <Link href="">Sign Up</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginCard;
