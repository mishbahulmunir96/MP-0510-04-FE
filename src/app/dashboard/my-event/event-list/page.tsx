import DashboardLayout from "@/features/dashboard/DashboardLayout";
import EventListPage from "@/features/dashboard/my-event/event-list";

const EventList = () => {
  return (
    <DashboardLayout>
      <EventListPage />
    </DashboardLayout>
  );
};

export default EventList;
