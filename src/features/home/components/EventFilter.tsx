import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Calendar } from "lucide-react"
  
  const EventFilter = () => {
    return (
      <div className="bg-white shadow-sm border rounded-lg p-4 md:p-6">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">Browsing events in</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-white border-gray-200 hover:bg-gray-50 transition-colors">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="location">JAKARTA</SelectItem>
                  <SelectItem value="categories">BANDUNGM</SelectItem>
                  <SelectItem value="categories">YOGYAKARTA</SelectItem>
                  <SelectItem value="categories">MEDAN</SelectItem>
                  <SelectItem value="categories">SURABAYA</SelectItem>
                  <SelectItem value="categories">BALI</SelectItem>
                  <SelectItem value="categories">SOLO</SelectItem>
                  <SelectItem value="all">All Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
  
            <div className="flex flex-wrap gap-3 md:ml-auto">
              <Select defaultValue="anytime">
                <SelectTrigger className="w-[150px] bg-white border-gray-200 hover:bg-gray-50 transition-colors">
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
  
              <Select defaultValue="all-categories">
                <SelectTrigger className="w-[150px] bg-white border-gray-200 hover:bg-gray-50 transition-colors">
                  <SelectValue placeholder="Category" />
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
        </div>
      </div>
    )
  }
  
  export default EventFilter