import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Event } from "@/types/event";
import Image from "next/image";
import { FC } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <Card>
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
          <Badge
            variant="outline"
            className="rounded-sm bg-gray-100 text-gray-600"
          >
            {format(event.createdAt, "dd MMM yyyy")}
          </Badge>
        </div>

        <h2 className="my-2 line-clamp-2 text-lg font-bold">{event.title}</h2>
        <p className="line-clamp-4">{event.description}</p>
      </CardContent>
    </Card>
  );
};

export default EventCard;
