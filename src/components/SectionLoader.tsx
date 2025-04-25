
import { Skeleton } from "@/components/ui/skeleton";

const SectionLoader = () => (
  <div className="w-full py-20">
    <div className="container mx-auto px-4">
      <Skeleton className="h-10 w-1/3 mx-auto mb-8" />
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-4 w-4/5 mb-4" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  </div>
);

export default SectionLoader;
