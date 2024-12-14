import { BiSearch } from 'react-icons/bi'

const Search = () => {
  return (
    <section className="mt-8 px-52">
       <div className='pt-4 flex  flex-col col-span-2 items-center'>
        <p className='  text-4xl text-blue-400 font-bold'>Explore Events</p>
        <p className="text-gray-600 mt-2">Find events near you and plan your schedule</p>
      </div>
    <div className="flex items-center bg-white rounded-full p-4 border border-blue-400">
      <BiSearch className="h-5 w-5 text-blue-500" />
      <input
        type="text"
        placeholder="Search events, artists, teams, and more"
        className="flex-grow bg-transparent focus:outline-none ml-2 text-gray-600"
      />
    </div>
  </section>
  )
}

export default Search