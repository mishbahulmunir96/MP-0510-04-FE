"use client";

import EventCard from "./EventCard";
import { useState } from "react";
import PaginationSection from "@/components/PaginationSection";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import { Input } from "@/components/ui/input";
import { FileMinus2 } from "lucide-react";

const EventList = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isPending } = useGetEvents({ page });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  if (isPending) {
    return <h1 className="text-center">Processing...</h1>;
  }

  if (!data) {
    return <h1 className="text-center">No Data</h1>;
  }

  return (
    <section className="mt-10 px-4">

    <>
    <Input
      className="mx-auto my-4 max-w-2xl rounded-full p-6"
      placeholder="Search"
      onChange={(e) =>{
        setPage(1)
        // setSearch(e.target.value)
      }}
      // value={search}
    />

<h1 className=" text-4xl flex justify-center items-center">Up Comming Events</h1>


    {isPending && (
      <div className="flex h-[30vh] items-center justify-center">
        <h1 className="text-center">Loading bentar ye...</h1>
      </div>
    )}

    {!data?.data.length ? (
      <div className="flex h-[30vh] items-center justify-center">
        <FileMinus2 />
        <h1 className="text-center">No Data Cok!</h1>
      </div>
    ) : (
      <>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {data.data.map((event, index) => {
            return <EventCard key={index} event={event} />;
          })}
        </div>

        <PaginationSection
          onChangePage={onChangePage}
          page={page}
          take={data.meta.take}
          total={data.meta.total}
          />
      </>
    )}
  </>
    </section>
  );
};

export default EventList;
