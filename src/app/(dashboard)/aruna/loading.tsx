import { Skeleton } from "@/shared/ui/skeleton";

export default function ArunaLoading() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-background/50">
      {/* Header Skeleton */}
      <div className="flex-none p-6 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div>
            <Skeleton className="h-6 w-32 mb-1" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>

      {/* Chat Area Skeleton */}
      <div className="flex-1 overflow-visible p-6 sm:p-8 md:px-24 lg:px-48">
        <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
          {/* Aruna message skeleton */}
          <div className="flex items-start gap-4">
            <Skeleton className="h-8 w-8 rounded-full shrink-0" />
            <div className="flex flex-col gap-2 w-full max-w-[80%]">
              <Skeleton className="h-20 w-full rounded-2xl rounded-tl-sm" />
            </div>
          </div>
          
          {/* User message skeleton */}
          <div className="flex items-start gap-4 flex-row-reverse">
            <Skeleton className="h-8 w-8 rounded-full shrink-0" />
            <div className="flex flex-col gap-2 w-full max-w-[80%] items-end">
              <Skeleton className="h-12 w-3/4 rounded-2xl rounded-tr-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Input Area Skeleton */}
      <div className="flex-none p-4 pb-8 border-t border-border/5 bg-background/80 backdrop-blur-md">
        <div className="max-w-3xl mx-auto relative flex items-center">
          <Skeleton className="h-14 w-full rounded-2xl" />
          <Skeleton className="absolute right-3 h-8 w-8 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
