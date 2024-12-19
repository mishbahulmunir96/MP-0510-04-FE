import * as Yup from "yup";

export const updateProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  email: Yup.string().required("Email is required").email(),
  gender: Yup.string()
    .oneOf(["Male", "Female"], "Gender must be either 'Male' or 'Female'")
    .required("Gender is required"),
  birthDate: Yup.date()
    .nullable()
    .required("Birth date is required")
    .max(new Date(), "Birth date must be in the past"),
});
