"use client"

import Markdown from "@/components/Markdown"
import { Badge } from "@/components/ui/badge"
import useGetEvent from "@/hooks/api/event/useGetEvent"
import Image from "next/image"
import { FC } from "react"
import SkeletonEvent from "./compoents/SkeletonEvent"

interface EventDetailProps {
    eventId: number
}


const EventDetailPage: FC<EventDetailProps> = ({eventId}) => {
    const {data, isPending} = useGetEvent(eventId)

    if(isPending) {
        return <SkeletonEvent/>
    }
    
    if(!data) {
        return <h1 className="text-center">No data</h1>
        
    }
  return  (
    
    <main className="container mx-auto max-w-5xl px-4">
        <section className=" space-y-2 mb-4">

            <h1 className="text-3xl font-semibold mt-4 flex justify-center">{data.title}</h1>

            <div className="relative h-[400px]">
                <Image 
                src={data.thumbnail} 
                alt="thumbnail" fill 
                className="object-cover" />
            </div>
            <Badge>{data.category}</Badge>

        </section>
            <Markdown content={data.content}/>
    </main>

  )
}

export default EventDetailPage