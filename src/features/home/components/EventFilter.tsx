'use client'

import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, MapPin, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"

const EventFilter = () => {
  const [location, setLocation] = useState('all')
  const [date, setDate] = useState('anytime')
  const [category, setCategory] = useState('all-categories')

  return (
    <div className="bg-white shadow-md border rounded-lg p-6">
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-grow">
            <span className="text-lg font-semibold text-gray-700">Find events in</span>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full sm:w-[200px] bg-white border-gray-300 hover:border-gray-400 transition-colors">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Select location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jakarta">Jakarta</SelectItem>
                <SelectItem value="bandung">Bandung</SelectItem>
                <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                <SelectItem value="medan">Medan</SelectItem>
                <SelectItem value="surabaya">Surabaya</SelectItem>
                <SelectItem value="bali">Bali</SelectItem>
                <SelectItem value="solo">Solo</SelectItem>
                <SelectItem value="all">All Locations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-3 lg:ml-auto">
            <Select value={date} onValueChange={setDate}>
              <SelectTrigger className="w-full sm:w-[150px] bg-white border-gray-300 hover:border-gray-400 transition-colors">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Date" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anytime">Any time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="weekend">This weekend</SelectItem>
                <SelectItem value="week">This week</SelectItem>
                <SelectItem value="month">This month</SelectItem>
              </SelectContent>
            </Select>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-[150px] bg-white border-gray-300 hover:border-gray-400 transition-colors">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="arts">Arts & Theater</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="food">Food & Drink</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors">
            Search Events
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EventFilter

