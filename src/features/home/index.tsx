import EventList from './components/EventList'
import HeroSection from './components/HeroSection'
import Search from './components/Search'

const HomePage = () => {
  return (
    <main className='container mx-auto p-4'>
        <HeroSection/>
        <Search/>
        <EventList/>
    </main>
  )
}

export default HomePage