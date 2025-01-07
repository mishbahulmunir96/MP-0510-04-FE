import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@/types/event";
import { FC } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <Link href={`/events/${event.id}`}>
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-6">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-primary">
            {event.title}
          </h2>

          <div className="space-y-4 text-base">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <p className="text-muted-foreground">
                {format(event.startTime, "dd MMM yyyy")} -{" "}
                {format(event.endTime, "dd MMM yyyy")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ClockIcon className="h-5 w-5 text-primary" />
              <p className="text-muted-foreground">
                {format(event.startTime, "HH:mm")} -{" "}
                {format(event.endTime, "HH:mm")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <MapPinIcon className="h-5 w-5 text-primary" />
              <p className="text-muted-foreground">{event.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;

