import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Event } from "@/types/event";
import Image from "next/image";
import { FC } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';

interface EventCardProps {
event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <Link href={`/events/${event.id}`} className="block h-full">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={event.thumbnail}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            <Badge
              variant="secondary"
              className="absolute left-2 top-2 bg-white/80 text-xs font-semibold backdrop-blur-sm"
            >
              {event.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h2 className="mb-2 line-clamp-2 text-xl font-bold leading-tight text-primary">
            {event.title}
          </h2>

          <div className="mb-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <p>
                {format(event.startTime, "dd MMM yyyy")} -{" "}
                {format(event.endTime, "dd MMM yyyy")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4" />
              <p>
                {format(event.startTime, "HH:mm")} -{" "}
                {format(event.endTime, "HH:mm")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              <p className="line-clamp-1">{event.address}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-primary">
              Rp {event.price.toLocaleString()}
            </p>
            <Badge variant="outline" className="text-xs">
              View Details
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;

