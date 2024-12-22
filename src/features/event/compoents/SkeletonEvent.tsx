import { Skeleton } from '@/components/ui/skeleton'

const SkeletonEvent = () => {
  return (
    <main className="container mx-auto max-w-5xl px-4 mt-4">
        <section className=" space-y-2">
        <Skeleton className="w-[10%] h-[22px] rounded-full" />
        <Skeleton className="w-[40%] h-[22px] rounded-full" />
        <Skeleton className="w[15%] h-[22px] rounded-full" />
        <Skeleton className="h-[200px] md:h-[400px] rounded-sm" />     
        </section>
    </main>
  )
}

export default SkeletonEvent