"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { CreateEventSchema } from "./schema";
import { format } from "date-fns";
import { CalendarIcon, Upload } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AuthGuard from "@/hoc/AuthGuard";
import { cn } from "@/lib/utils";
import useCreateEvent from "@/hooks/api/event/useCreateEvent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

const CreateEventPage = () => {
  const { mutateAsync: createEvent, isPending } = useCreateEvent();

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
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
      setIsConfirmDialogOpen(true);
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailReff = useRef<HTMLInputElement>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleConfirmedSubmit = async () => {
    setIsConfirmDialogOpen(false);
    await createEvent(formik.values);
  };

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

  // New handler for availableSeat
  const handleAvailableSeatChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      formik.setFieldValue("availableSeat", value);
    } else {
      formik.setFieldValue("availableSeat", 0); // Optionally set to 0 if negative
    }
  };

  // New handler for price
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      formik.setFieldValue("price", value);
    } else {
      formik.setFieldValue("price", 0); // Optionally set to 0 if negative
    }
  };

  return (
    <main className="container mx-auto my-8 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-400 text-white">
          <CardTitle className="text-3xl font-bold">Create New Event</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form className="space-y-8" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-lg font-semibold">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Event Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-gray-300"
                />
                {!!formik.touched.title && !!formik.errors.title && (
                  <p className="text-sm text-red-500">{formik.errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-lg font-semibold">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="music">Music</option>
                  <option value="sport">Sport</option>
                  <option value="nightlife">Nightlife</option>
                </select>
                {!!formik.touched.category && !!formik.errors.category && (
                  <p className="text-sm text-red-500">{formik.errors.category}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-semibold">Description</Label>
              <RichTextEditor
                value={formik.values.content}
                onChange={(value: string) => formik.setFieldValue("content", value)}
                isError={!!formik.errors.content} label={""}              
              />
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">Thumbnail</Label>
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => thumbnailReff.current?.click()}
                  className="border-dashed border-2 border-gray-300 hover:border-gray-400"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
                <Input
                  ref={thumbnailReff}
                  type="file"
                  accept="image/*"
                  onChange={onChangeThumbnail}
                  className="hidden"
                />
                {selectedImage && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={removeThumbnail}
                  >
                    Remove
                  </Button>
                )}
              </div>
              {selectedImage && (
                <div className="relative mt-4 h-[200px] w-full overflow-hidden rounded-md">
                  <Image
                    src={selectedImage}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-lg font-semibold">Address</Label>
              <select
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="" disabled>Select a city</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Bandung">Bandung</option>
                <option value="Yogyakarta">Yogyakarta</option>
                <option value="Surabaya">Surabaya</option>
              </select>
              {!!formik.touched.address && !!formik.errors.address && (
                <p className="text-sm text-red-500">{formik.errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-lg font-semibold">Available Seats</Label>
                <Input
                  name="availableSeat"
                  type="number"
                  placeholder="Available Seats"
                  value={formik.values.availableSeat!}
                  onChange={handleAvailableSeatChange} // Updated handler
                  onBlur={formik.handleBlur}
                  className="border-gray-300"
                />
                {!!formik.touched.availableSeat && !!formik.errors.availableSeat && (
                  <p className="text-sm text-red-500">{formik.errors.availableSeat}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-semibold">Price</Label>
                <Input
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={formik.values.price}
                  onChange={handlePriceChange} // Updated handler
                  onBlur={formik.handleBlur}
                  className="border-gray-300"
                />
                {formik.touched.price && formik.errors.price && (
                  <p className="text-sm text-red-500">
                    {isNaN(Number(formik.errors.price))
                      ? formik.errors.price
                      : Number(formik.errors.price).toFixed(3)}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-lg font-semibold">Start Time</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formik.values.startTime && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
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
                  <Input
                    type="time"
                    value={formik.values.startTime ? format(formik.values.startTime, "HH:mm") : ""}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(":");
                      const newDate = formik.values.startTime ? new Date(formik.values.startTime) : new Date();
                      newDate.setHours(parseInt(hours), parseInt(minutes));
                      formik.setFieldValue("startTime", newDate);
                    }}
                    className="border-gray-300"
                  />
                </div>
                {!!formik.touched.startTime && !!formik.errors.startTime && (
                  <p className="text-sm text-red-500">{formik.errors.startTime}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-lg font-semibold">End Time</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formik.values.endTime && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
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
                  <Input
                    type="time"
                    value={formik.values.endTime ? format(formik.values.endTime, "HH:mm") : ""}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(":");
                      const newDate = formik.values.endTime ? new Date(formik.values.endTime) : new Date();
                      newDate.setHours(parseInt(hours), parseInt(minutes));
                      formik.setFieldValue("endTime", newDate);
                    }}
                    className="border-gray-300"
                  />
                </div>
                {!!formik.touched.endTime && !!formik.errors.endTime && (
                  <p className="text-sm text-red-500">{formik.errors.endTime}</p>
                )}
              </div>
            </div>

            <div className="pt-6">
              <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
                <DialogTrigger asChild>
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-400 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300" disabled={isPending}>
                    {isPending ? "Processing..." : "Create Event"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Event Creation</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to create this event? Please review all details before confirming.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleConfirmedSubmit} disabled={isPending} className="bg-gradient-to-r from-purple-500 to-blue-400 text-white">
                      {isPending ? "Processing..." : "Confirm"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default AuthGuard(CreateEventPage);
