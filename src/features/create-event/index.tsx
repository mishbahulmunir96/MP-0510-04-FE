"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateEvent from "@/hooks/api/event/useCreateEvent";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { CreateEventSchema } from "./schema";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AuthGuard from "@/hoc/AuthGuard";
import { cn } from "@/lib/utils";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

const CreateEventPage = () => {
  const { mutateAsync: createEvent, isPending } = useCreateEvent();

  const formik = useFormik({
    initialValues: {
      title: "",

      category: "",
      description: "",
      content: "",
      thumbnail: null,
      address: "",
      price: 0,
      availableSeat: 0,
      startTime: undefined,
      endTime: undefined,
    },
    validationSchema: CreateEventSchema,
    onSubmit: async (values) => {
      await createEvent(values);

    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
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

  return (
    <main className="container mx-auto my-4 max-w-5xl border px-4">
      <form className="mt-10 space-y-4" onSubmit={formik.handleSubmit}>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            type="text"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {!!formik.touched.title && !!formik.errors.title ? (
            <p className="text-xs text-red-500">{formik.errors.title}</p>
          ) : null}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            type="text"
            placeholder="Your Name/Organizer"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {!!formik.touched.name && !!formik.errors.name ? (
            <p className="text-xs text-red-500">{formik.errors.name}</p>
          ) : null}
        </div>

          <Label htmlFor="category">Category</Label>
          <Input
            name="category"
            type="text"
            placeholder="Category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {!!formik.touched.category && !!formik.errors.category ? (
            <p className="text-xs text-red-500">{formik.errors.category}</p>
          ) : null}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            placeholder="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={5}
            style={{ resize: "none" }}
          />
          {!!formik.touched.description && !!formik.errors.description ? (
            <p className="text-xs text-red-500">{formik.errors.description}</p>
          ) : null}
        </div>

        <RichTextEditor
          label="Content"
          value={formik.values.content}
          onChange={(value: string) => formik.setFieldValue("content", value)}
          isError={!!formik.errors.content}
        />

        {selectedImage && (
          <>
            <div className="relative h-[150px] w-[200px]">
              <Image
                src={selectedImage}
                alt="thumbnail"
                fill
                className="-z-10 object-cover"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={removeThumbnail}
            >
              Remove
            </Button>
          </>
        )}

        <div className="flex flex-col space-y-1.5">
          <Label>Thumbnail</Label>
          <Input
            ref={thumbnailReff}
            type="file"
            accept="image/*"
            onChange={onChangeThumbnail}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="address">Address</Label>
          <Input
            name="address"
            type="text"
            placeholder="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {!!formik.touched.address && !!formik.errors.address ? (
            <p className="text-xs text-red-500">{formik.errors.address}</p>
          ) : null}
        </div>

        <div className="flex justify-items-start gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="availableSeat">Available Seat</Label>
            <Input
              name="availableSeat"
              type="text"
              placeholder="Available Seat"
              value={formik.values.availableSeat!}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-40"
            />
            {!!formik.touched.availableSeat && !!formik.errors.availableSeat ? (
              <p className="text-xs text-red-500">
                {formik.errors.availableSeat}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="price">Price</Label>
            <Input
              name="price"
              type="text"
              placeholder="Price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-60"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-xs text-red-500">
                {isNaN(Number(formik.errors.price))
                  ? formik.errors.price
                  : Number(formik.errors.price).toFixed(3)}
              </p>
            )}
          </div>

        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="startTime">Start Time</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !formik.values.startTime && "text-muted-foreground",
                )}
              >
                <CalendarIcon />
                {formik.values.startTime ? (
                  format(formik.values.startTime, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formik.values.startTime}
                onSelect={(date) => formik.setFieldValue("startTime", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {!!formik.touched.startTime && !!formik.errors.startTime && (
            <p className="text-xs text-red-500">{formik.errors.startTime}</p>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="endTime">End Time</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !formik.values.endTime && "text-muted-foreground",
                )}
              >
                <CalendarIcon />
                {formik.values.endTime ? (
                  format(formik.values.endTime, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formik.values.endTime}
                onSelect={(date) => formik.setFieldValue("endTime", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {!!formik.touched.endTime && !!formik.errors.endTime && (
            <p className="text-xs text-red-500">{formik.errors.endTime}</p>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="my-10" disabled={isPending}>
            {isPending ? "Processing..." : "Submit"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default AuthGuard(CreateEventPage);
