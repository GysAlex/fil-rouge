export function PropertyDetailsSkeleton() {
    return (
        <div className="flex items-stretch flex-col justify-start gap-4">
            {/* Bouton retour skeleton */}
            <div className="w-[100px] h-[44px] bg-gray-200 rounded-4xl animate-pulse" />

            {/* Stats Cards Skeleton */}
            <div className="stat container min-h-[140px] gap-3 grid grid-cols-1 md:grid-cols-2 grid-rows-3 md:grid-rows-1 lg:grid-cols-3">
                {[1, 2, 3].map((index) => (
                    <div key={index} className="flex flex-col justify-center gap-6 border-l-4 border-l-gray-200 shadow-sm p-3">
                        <div className="flex items-center justify-start gap-6 w-[80%] mx-auto">
                            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="flex items-center justify-start gap-6 w-[80%] mx-auto">
                            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Locataires Section Skeleton */}
            <div className="mt-5">
                <div className="flex justify-between items-center mb-4">
                    <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                    <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
                </div>

                <div className="bg-white p-4 rounded-lg">
                    {/* Table Header Skeleton */}
                    <div className="hidden md:grid grid-cols-5 gap-4 my-4">
                        {[1, 2, 3, 4, 5].map((index) => (
                            <div key={index} className="h-4 bg-gray-200 rounded animate-pulse" />
                        ))}
                    </div>

                    {/* Table Rows Skeleton */}
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="flex flex-col md:grid md:grid-cols-5 gap-4 py-3 items-center border-b">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                            </div>
                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Prospects Section Skeleton */}
            <div className="mt-5">
                <div className="flex justify-between items-center mb-4">
                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                    <div className="flex gap-3">
                        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
                        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                    {/* Table Header Skeleton */}
                    <div className="hidden md:grid grid-cols-4 gap-4 my-4">
                        {[1, 2, 3, 4].map((index) => (
                            <div key={index} className="h-4 bg-gray-200 rounded animate-pulse" />
                        ))}
                    </div>

                    {/* Table Rows Skeleton */}
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="flex flex-col md:grid md:grid-cols-4 gap-4 py-3 items-center border-b">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                            </div>
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}