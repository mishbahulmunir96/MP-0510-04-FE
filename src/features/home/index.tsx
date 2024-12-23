import EventList from "./components/EventList";
import { EventsNavigation } from "./components/EventNavigation";
import HeroSection from "./components/HeroSection";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <EventsNavigation />
      <EventList />
    </main>
  );
};

export default HomePage;
