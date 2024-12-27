"use client";

import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import useGetEvent from "@/hooks/api/event/useGetEvent";
import useUpdateEvent from "@/hooks/api/event/useUpdateEvent";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { DateInput } from "../components/DateInput";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateEventSchema } from "./schema";
import { Loader2 } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import ModalConfirmation from "@/components/ModalConfirmation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateEventPageProps {
  eventId: number;
}

const UpdateEventPage: React.FC<UpdateEventPageProps> = ({ eventId }) => {
  const { data: event, isLoading } = useGetEvent(eventId);
  const { mutateAsync: updateEvent, isPending } = useUpdateEvent();
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState<string>(
    event?.thumbnail || "",
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const thumbnailReff = useRef<HTMLInputElement>(null);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeThumbnail = () => {
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");

    if (thumbnailReff.current) {
      thumbnailReff.current.value = "";
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      content: "",
      thumbnail: null,
      address: "",
      price: 0,
      availableSeat: 0,
      startTime: "",
      endTime: "",
    },
    validationSchema: updateEventSchema,
    onSubmit: async (values) => {
      await updateEvent({ id: eventId, payload: values });
      router.push("/dashboard/my-event/event-list");
    },
  });

  useEffect(() => {
    if (event) {
      formik.setValues({
        title: event.title,
        category: event.category,
        content: event.content,
        thumbnail: null,
        address: event.address,
        price: event.price,
        availableSeat: event.availableSeat,
        startTime: new Date(event.startTime).toISOString(),
        endTime: new Date(event.endTime).toISOString(),
      });
    }
  }, [event]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <main className="container mx-auto my-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Update Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <InputField
                  htmlFor="title"
                  label="Event Title"
                  type="text"
                  placeholder="Event Title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />

                {formik.touched.title && formik.errors.title ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.title}
                  </div>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label className="text-base text-slate-700">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg border p-2"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="music">Music</option>
                  <option value="sport">Sport</option>
                  <option value="nightlife">Nightlife</option>
                </select>

                {formik.touched.category && formik.errors.category ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.category}
                  </div>
                ) : null}
              </div>

              <div className="col-span-2 space-y-2">
                <RichTextEditor
                  label="Description"
                  value={formik.values.content}
                  onChange={(value: string) =>
                    formik.setFieldValue("content", value)
                  }
                  isError={!!formik.errors.content}
                />

                {formik.touched.content && formik.errors.content ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.content}
                  </div>
                ) : null}
              </div>

              <div className="col-span-2 space-y-2">
                <div className="relative h-32 w-32 border-2 border-red-400">
                  <Image
                    src={selectedImage}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>

                <InputField
                  htmlFor="thumbnail"
                  label="Thumbnail"
                  type="file"
                  ref={thumbnailReff}
                  accept="image/*"
                  onChange={onChangeThumbnail}
                />
                {selectedImage && (
                  <>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={removeThumbnail}
                    >
                      Remove
                    </Button>
                  </>
                )}
              </div>

              <div className="col-span-2 space-y-2">
                <InputField
                  htmlFor="address"
                  label="Address"
                  type="text"
                  placeholder="Address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />

                {formik.touched.address && formik.errors.address ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.address}
                  </div>
                ) : null}
              </div>

              <div className="space-y-2">
                <InputField
                  htmlFor="availableSeat"
                  label="Available Seats"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.availableSeat}
                />

                {formik.touched.availableSeat && formik.errors.availableSeat ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.availableSeat}
                  </div>
                ) : null}
              </div>

              <div className="space-y-2">
                <InputField
                  htmlFor="price"
                  label="Price"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />

                {formik.touched.price && formik.errors.price ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.price}
                  </div>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label className="text-base text-slate-700">Start Time</Label>

                <div className="flex space-x-2">
                  <DateInput
                    value={formik.values.startTime}
                    onChange={(date) => formik.setFieldValue("startTime", date)}
                  />

                  <Input
                    type="time"
                    value={
                      formik.values.startTime
                        ? format(formik.values.startTime, "HH:mm")
                        : ""
                    }
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(":");
                      const newDate = formik.values.startTime
                        ? new Date(formik.values.startTime)
                        : new Date();
                      newDate.setHours(parseInt(hours), parseInt(minutes));
                      formik.setFieldValue("startTime", newDate);
                    }}
                  />
                </div>

                {formik.touched.startTime && formik.errors.endTime ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.startTime}
                  </div>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label className="text-base text-slate-700">End Time</Label>

                <div className="flex space-x-2">
                  <DateInput
                    value={formik.values.endTime}
                    onChange={(date) => formik.setFieldValue("endTime", date)}
                  />

                  <Input
                    type="time"
                    value={
                      formik.values.endTime
                        ? format(formik.values.endTime, "HH:mm")
                        : ""
                    }
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(":");
                      const newDate = formik.values.endTime
                        ? new Date(formik.values.endTime)
                        : new Date();
                      newDate.setHours(parseInt(hours), parseInt(minutes));
                      formik.setFieldValue("endTime", newDate);
                    }}
                  />
                </div>

                {formik.touched.endTime && formik.errors.endTime ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.endTime}
                  </div>
                ) : null}
              </div>

              <Button
                type="button"
                disabled={isPending}
                onClick={() => setIsDialogOpen(true)}
                className="col-span-2 bg-blue-500 font-medium hover:bg-blue-600"
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span className="ml-2">Please wait</span>
                  </>
                ) : (
                  "Update Event"
                )}
              </Button>

              <ModalConfirmation
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title="Are you sure to update this event?"
                description="Please review all details before confirming."
                onConfirm={formik.handleSubmit}
                confirmText="Yes"
                cancelText="Cancel"
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default UpdateEventPage;
