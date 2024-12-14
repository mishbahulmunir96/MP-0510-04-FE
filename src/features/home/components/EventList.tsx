"use client";

import EventCard from "./EventCard";
import { useState } from "react";
import PaginationSection from "@/components/PaginationSection";
import useGetEvents from "@/hooks/api/event/useGetEvents";

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
    <>
      <div className="mt-8 grid grid-cols-4 gap-4">
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
  );
};

export default EventList;
