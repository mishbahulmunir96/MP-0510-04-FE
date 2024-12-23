import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Event } from "@/types/event";
import Image from "next/image";
import { FC } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <Link href={`/events/${event.id}`}>
    <Card className=" h-full">
      <CardHeader>
        <div className="relative h-[220px] w-full overflow-hidden rounded-lg">
          <Image
            src={event.thumbnail}
            alt="thumbnail"
            fill
            className="object-cover duration-100 hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="rounded-sm bg-green-100 text-green-600"
          >
            {event.category}
          </Badge>
        </div>

        <h2 className="my-2 line-clamp-2 text-xl font-bold">{event.title}</h2>

        <div className="my-2">
          <p className="text-md font-semibold text-gray-400">
            {format(event.startTime, "dd MMM yyyy")} -{" "}
            {format(event.endTime, "dd MMM yyyy")}
          </p>
        </div>

        <div>
          <p>Location: {event.address}</p>
        </div>
        <div className="my-2">
          <p className="Text-sm font-semibold">Rp.{event.price}</p>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};

export default EventCard;
