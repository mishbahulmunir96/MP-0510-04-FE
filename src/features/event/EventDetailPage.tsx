"use client";

import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetEvent from "@/hooks/api/event/useGetEvent";
import Image from "next/image";
import { FC } from "react";
import SkeletonEvent from "./compoents/SkeletonEvent";

interface EventDetailProps {
  eventId: number;
}

const EventDetailPage: FC<EventDetailProps> = ({ eventId }) => {
  const { data, isPending } = useGetEvent(eventId);

  if (isPending) {
    return <SkeletonEvent />;
  }

  if (!data) {
    return <h1 className="text-center">No data</h1>;
  }
  return (
    <main className="container mx-auto mt-8 px-12">
      <section className="mb-4 space-y-2">
        <div className="grid grid-cols-3 gap-8">
          <div className="relative col-span-2 h-[400px]">
            <Image
              src={data.thumbnail}
              alt="thumbnail"
              fill
              className="rounded-xl object-cover"
            />
          </div>

          <div>
            <Card className="md:sticky md:top-6 md:h-[400px]">
              <CardContent className="space-y-4">
                <div className="mb-4">
                  <h1 className="mt-4 text-3xl font-semibold">{data.title}</h1>
                </div>
                <div>
                  <p className="text-sm"> {data.address}</p>
                </div>

                <div className="mt-28">
                  <p className="text-2xl font-bold">Rp.{data.price}</p>
                  <Button className="bg-blue-400 hover:bg-blue-500 w-full" size="lg">
                    Buy Now
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Present by: {data.name}
                  </p>
                </div>
              </CardContent>
            </Card>-
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 pt-10">
          <div className="col-span-2">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="flex h-16 items-center justify-between bg-blue-400 px-32">
                <TabsTrigger className="text-md font-bold" value="description">
                  DESCRIPTION
                </TabsTrigger>
                <TabsTrigger className="text-md font-bold" value="ticket">
                  TICKET
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4">
                <Markdown content={data.description} />
              </TabsContent>
              <TabsContent value="ticket">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Start From
                        </p>
                        <p className="text-2xl font-bold">{data.price}</p>
                      </div>
                      <Button className="bg-blue-400 hover:bg-blue-500" size="lg">Buy now</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
           
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventDetailPage;
