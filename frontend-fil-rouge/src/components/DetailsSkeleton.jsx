export function DetailSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Bouton Retour Skeleton */}
            <div className="w-[100px] h-[44px] bg-gray-200 rounded-4xl" />

            {/* Title Section Skeleton */}
            <div className="title mt-[15px] flex items-center justify-between">
                <div className="flex flex-col items-start justify-center gap-4">
                    <div className="h-8 w-48 bg-gray-200 rounded-lg" />
                    <div className="flex gap-4">
                        <div className="h-6 w-32 bg-gray-200 rounded-lg" />
                        <div className="hidden sm:block h-6 w-32 bg-gray-200 rounded-lg" />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 bg-gray-200 rounded-full" />
                    <div className="h-8 w-8 bg-gray-200 rounded-full" />
                </div>
            </div>

            {/* Image Container Skeleton */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="h-64 bg-gray-200 rounded-lg col-span-2 row-span-2" />
                <div className="h-64 bg-gray-200 rounded-lg" />
                <div className="h-64 bg-gray-200 rounded-lg" />
            </div>

            {/* Info Section Skeleton */}
            <div className="moreInfo mt-8 grid md:grid-cols-2 gap-[30px]">
                {/* Left Column */}
                <div className="left space-y-8">
                    {/* Propriétaire Info Skeleton */}
                    <div className="h-32 bg-gray-200 rounded-lg" />
                    
                    {/* Features Section */}
                    <div className="space-y-4">
                        <div className="h-8 w-48 bg-gray-200 rounded-lg" />
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-10 w-32 bg-gray-200 rounded-full" />
                            ))}
                        </div>
                        <div className="h-32 bg-gray-200 rounded-lg" />
                    </div>

                    {/* Distance Section */}
                    <div className="space-y-4">
                        <div className="h-8 w-48 bg-gray-200 rounded-lg" />
                        <div className="flex items-center justify-between">
                            <div className="h-8 w-8 bg-gray-200 rounded-full" />
                            <div className="h-2 w-1/2 bg-gray-200" />
                            <div className="h-8 w-8 bg-gray-200 rounded-full" />
                            <div className="h-8 w-24 bg-gray-200 rounded-full" />
                        </div>
                    </div>

                    {/* Occupation Chart Skeleton */}
                    <div className="space-y-4">
                        <div className="h-8 w-48 bg-gray-200 rounded-lg" />
                        <div className="h-[195px] bg-gray-200 rounded-lg" />
                        <div className="h-24 bg-gray-200 rounded-lg" />
                    </div>
                </div>

                {/* Right Column - Pricing Card */}
                <div className="right">
                    <div className="pricing sticky rounded-[10px] w-[90%] top-30 lg:w-[461px] p-6 bg-white shadow-lg">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="h-6 w-32 bg-gray-200 rounded-lg" />
                                <div className="h-8 w-48 bg-gray-200 rounded-lg" />
                            </div>
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="h-6 w-6 bg-gray-200 rounded-full" />
                                    <div className="h-6 w-3/4 bg-gray-200 rounded-lg" />
                                </div>
                            ))}
                            <div className="h-12 w-full bg-gray-200 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments Section Skeleton */}
            <div className="mt-[45px] space-y-6">
                <div className="h-8 w-48 bg-gray-200 rounded-lg" />
                <div className="flex items-center justify-between">
                    <div className="h-6 w-1/3 bg-gray-200 rounded-lg" />
                    <div className="h-10 w-48 bg-gray-200 rounded-lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-48 bg-gray-200 rounded-lg" />
                    ))}
                </div>
            </div>

            {/* Map Section Skeleton */}
            <div className="mt-[45px] space-y-4">
                <div className="h-8 w-48 bg-gray-200 rounded-lg" />
                <div className="h-[450px] bg-gray-200 rounded-lg" />
            </div>

            {/* Similar Properties Section Skeleton */}
            <div className="mt-[45px] space-y-6">
                <div className="h-8 w-72 bg-gray-200 rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-[590px] bg-gray-200 rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    );
}