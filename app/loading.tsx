import { Skeleton, ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="container-ketty flex flex-col gap-10 py-12">
      <div className="flex flex-col items-center gap-3 text-center">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-9 w-72 max-w-full" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}