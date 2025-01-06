import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Current Password is required")
    .min(6)
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(6)
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "New Password must match")
    .required("Confirm New Password is required"),
});
