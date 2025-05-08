export function FavorisSkeleton() {
    return (
        <div className="animate-pulse max-w-[1258px] px-[75px] xl:px-0 mx-auto lg:px-[60px] pt-[33px]">
            {/* Header Skeleton */}
            <div className="py-6 w-full mx-auto">
                <div className="h-6 w-24 bg-gray-200 rounded mb-1"></div>
                <div className="h-8 w-96 bg-gray-200 rounded mb-6"></div>
            </div>

            {/* Favoris Cards Skeleton */}
            <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white rounded-lg overflow-hidden shadow-sm">
                        <div className="grid md:grid-cols-3 grid-cols-1 grid-rows-2 md:grid-rows-1">
                            {/* Image Skeleton */}
                            <div className="relative h-[250px] bg-gray-200"></div>

                            {/* Content Skeleton */}
                            <div className="p-4 relative col-span-2">
                                {/* Title and Rating */}
                                <div className="flex justify-between mb-4">
                                    <div className="h-6 w-48 bg-gray-200 rounded"></div>
                                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                                </div>

                                {/* Tags Skeleton */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {[1, 2, 3].map((tag) => (
                                        <div key={tag} className="h-6 w-20 bg-gray-200 rounded-full"></div>
                                    ))}
                                </div>

                                {/* Description Skeleton */}
                                <div className="mb-4 space-y-2">
                                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                </div>

                                {/* Details Skeleton */}
                                <div className="space-y-2 mb-4">
                                    {[1, 2, 3].map((detail) => (
                                        <div key={detail} className="flex items-center">
                                            <div className="h-4 w-6 bg-gray-200 rounded mr-2"></div>
                                            <div className="h-4 w-48 bg-gray-200 rounded"></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Button Skeleton */}
                                <div className="text-center">
                                    <div className="h-10 w-48 bg-gray-200 rounded-2xl mx-auto"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}