"use client";
import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useCreateVoucher from "@/hooks/api/voucher/useCreateVoucher";
import { useFormik } from "formik";
import { DateInput } from "../../components/DateInput";
import { createVoucherSchema } from "./schema";

const CreateVoucherPage = () => {
  const { mutateAsync: createVoucher, isPending } = useCreateVoucher();

  const formik = useFormik({
    initialValues: {
      voucherCode: "",
      qty: 0, // Pastikan ini tipe number
      value: 0, // Pastikan ini tipe number
      expDate: "",
    },
    validationSchema: createVoucherSchema,
    onSubmit: async (values) => {
      await createVoucher(values);
    },
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Create Voucher</h1>
      <form className="max-w-md space-y-4" onSubmit={formik.handleSubmit}>
        <div>
          <InputField
            htmlFor="voucherCode"
            label="Voucher Code"
            type="text"
            placeholder="Voucher Code"
            onChange={formik.handleChange}
            value={formik.values.voucherCode}
            onBlur={formik.handleBlur}
          />
          {formik.touched.voucherCode && formik.errors.voucherCode ? (
            <div className="text-sm text-red-600">
              {formik.errors.voucherCode}
            </div>
          ) : null}
        </div>

        <div>
          <InputField
            htmlFor="qty"
            label="Quantity"
            type="number"
            placeholder="0"
            onChange={formik.handleChange}
            value={formik.values.qty}
            onBlur={formik.handleBlur}
          />
          {formik.touched.qty && formik.errors.qty ? (
            <div className="text-sm text-red-600">{formik.errors.qty}</div>
          ) : null}
        </div>

        <div>
          <InputField
            htmlFor="value"
            label="Value"
            type="number"
            placeholder="0"
            onChange={formik.handleChange}
            value={formik.values.value}
            onBlur={formik.handleBlur}
          />
          {formik.touched.value && formik.errors.value ? (
            <div className="text-sm text-red-600">{formik.errors.value}</div>
          ) : null}
        </div>

        <div>
          <Label htmlFor="expiredDate">Expired Date</Label>

          <DateInput
            value={formik.values.expDate}
            onChange={(date) => formik.setFieldValue("expDate", date)}
          />

          {formik.touched.expDate && formik.errors.expDate ? (
            <div className="text-sm text-red-600">{formik.errors.expDate}</div>
          ) : null}
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Create Voucher"}
        </Button>
      </form>
    </div>
  );
};

export default CreateVoucherPage;
