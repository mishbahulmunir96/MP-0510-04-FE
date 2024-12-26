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
      name: "",
      category: "",
      description: "",
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
        name: event.name,
        category: event.category,
        description: event.description,
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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="pt-20">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <InputField
            htmlFor="title"
            label="Event Title"
            type="text"
            placeholder="Event Title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />

          {formik.touched.title && formik.errors.title ? (
            <div className="text-sm text-red-600">{formik.errors.title}</div>
          ) : null}
        </div>

        <div>
          <InputField
            htmlFor="name"
            label="Name"
            type="text"
            placeholder="Name of Organizer"
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          {formik.touched.name && formik.errors.name ? (
            <div className="text-sm text-red-600">{formik.errors.name}</div>
          ) : null}
        </div>

        <div>
          <InputField
            htmlFor="category"
            label="Category"
            type="text"
            placeholder="Category"
            onChange={formik.handleChange}
            value={formik.values.category}
          />

          {formik.touched.category && formik.errors.category ? (
            <div className="text-sm text-red-600">{formik.errors.category}</div>
          ) : null}
        </div>

        <div>
          <InputField
            htmlFor="description"
            label="Description"
            type="text"
            placeholder="Description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-sm text-red-600">
              {formik.errors.description}
            </div>
          ) : null}
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <Textarea
            id="content"
            placeholder="Content"
            onChange={formik.handleChange}
            value={formik.values.content}
          />

          {formik.touched.content && formik.errors.content ? (
            <div className="text-sm text-red-600">{formik.errors.content}</div>
          ) : null}
        </div>

        <div>
          <InputField
            htmlFor="address"
            label="Address"
            type="text"
            placeholder="Address"
            onChange={formik.handleChange}
            value={formik.values.address}
          />

          {formik.touched.address && formik.errors.address ? (
            <div className="text-sm text-red-600">{formik.errors.address}</div>
          ) : null}
        </div>

        <div>
          {/* starttime */}
          <Label>Start Time</Label>
          <DateInput
            value={formik.values.startTime}
            onChange={(date) => formik.setFieldValue("startTime", date)}
          />

          {formik.touched.startTime && formik.errors.endTime ? (
            <div className="text-sm text-red-600">
              {formik.errors.startTime}
            </div>
          ) : null}
        </div>

        <div>
          {/* endtime */}
          <Label>End Time</Label>
          <DateInput
            value={formik.values.endTime}
            onChange={(date) => formik.setFieldValue("endTime", date)}
          />

          {formik.touched.endTime && formik.errors.endTime ? (
            <div className="text-sm text-red-600">{formik.errors.endTime}</div>
          ) : null}
        </div>

        <div>
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

        <div>
          <InputField
            htmlFor="price"
            label="Price"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.price}
          />

          {formik.touched.price && formik.errors.price ? (
            <div className="text-sm text-red-600">{formik.errors.price}</div>
          ) : null}
        </div>

        <div>
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

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              <span className="ml-2">Please wait</span>
            </>
          ) : (
            "Update Event"
          )}
        </Button>
      </form>
    </div>
  );
};

export default UpdateEventPage;
