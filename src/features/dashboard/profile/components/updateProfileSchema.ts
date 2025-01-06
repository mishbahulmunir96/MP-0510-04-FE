import * as Yup from "yup";

export const updateProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  email: Yup.string().required("Email is required").email(),
  gender: Yup.string().oneOf(
    ["Male", "Female"],
    "Gender must be either 'Male' or 'Female'",
  ),
  birthDate: Yup.date()
    .nullable()
    .max(new Date(), "Birth date must be in the past"),
});
