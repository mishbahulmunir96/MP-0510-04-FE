import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  email: Yup.string().required("Email is required").email(),
  password: Yup.string()
    .required("Password is required")
    .min(6)
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Confirm Password is required"),
  role: Yup.string().required("Role is required"),
});
