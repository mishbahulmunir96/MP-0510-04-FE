"use client";
import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetEventsByUser from "@/hooks/api/event/useGetEventsByUser";
import useCreateVoucher from "@/hooks/api/voucher/useCreateVoucher";
import { useFormik } from "formik";
import { DateInput } from "../../components/DateInput";
import { createVoucherSchema } from "./schema";
import { Loader2 } from "lucide-react";
import ModalConfirmation from "@/components/ModalConfirmation";
import { useState } from "react";

const CreateVoucherPage = () => {
  const { mutateAsync: createVoucher, isPending } = useCreateVoucher();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: events } = useGetEventsByUser();

  const formik = useFormik({
    initialValues: {
      voucherCode: "",
      qty: 0,
      value: 0,
      expDate: "",
      eventId: "",
    },
    validationSchema: createVoucherSchema,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        eventId: Number(values.eventId), // Mengonversi eventId ke number saat membuat payload
      };
      await createVoucher(payload); // Menggunakan payload yang telah disiapkan
    },
  });

  return (
    <main className="mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Create Voucher</h1>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div className="grid w-full grid-cols-2 gap-6">
          <div className="col-span-2 space-y-2">
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

          <div className="col-span-2 flex flex-col">
            <Label
              htmlFor="expiredDate"
              className="mb-1 text-base text-slate-700"
            >
              Expired Date
            </Label>

            <DateInput
              value={formik.values.expDate}
              onChange={(date) => formik.setFieldValue("expDate", date)}
            />

            {formik.touched.expDate && formik.errors.expDate ? (
              <div className="text-sm text-red-600">
                {formik.errors.expDate}
              </div>
            ) : null}
          </div>

          <div className="col-span-2">
            {" "}
            <Label htmlFor="eventId" className="mb-1 text-base text-slate-700">
              Select Event
            </Label>
            <Select
              onValueChange={(value) => formik.setFieldValue("eventId", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Events</SelectLabel>
                  {events?.map((event) => (
                    <SelectItem key={event.id} value={String(event.id)}>
                      {event.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {formik.touched.eventId && formik.errors.eventId ? (
              <div className="text-sm text-red-600">
                {formik.errors.eventId}
              </div>
            ) : null}
          </div>

          <div>
            <Button
              type="button"
              disabled={isPending}
              onClick={() => setIsDialogOpen(true)}
              className="bg-blue-500 font-medium hover:bg-blue-600"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span className="ml-2">Please wait</span>
                </>
              ) : (
                "Create Voucher"
              )}
            </Button>
            <ModalConfirmation
              isOpen={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              title="Are you absolutely sure?"
              description="Please check all detail before confirm."
              onConfirm={formik.handleSubmit}
              confirmText="Yes"
              cancelText="Cancel"
            />
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateVoucherPage;
