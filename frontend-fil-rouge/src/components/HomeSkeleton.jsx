import React from 'react';

export function HomeSkeleton() {
    return (
        <div className="lg:w-[382px] homecard w-[90%] mx-auto flex-grow lg:mx-0 p-1.5 grid grid-rows-2 gap-[25px] rounded-[10px] animate-pulse" 
             style={{ boxShadow: "0 0 7px rgba(0, 0, 0, .25)" }}>
            {/* Image Skeleton */}
            <div className="img-cont relative -z-20 h-[200px]">
                <div className="w-full h-full bg-gray-200 rounded-[10px]"></div>
                <div className="absolute top-0 right-0 w-[60px] h-[40px] bg-gray-300 rounded-tr-[10px] rounded-bl-[10px]"></div>
            </div>

            {/* Info Skeleton */}
            <div className="info flex flex-col items-stretch justify-start gap-[15px]">
                {/* Title and Rating */}
                <div className="infoF flex items-center justify-between">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex items-center justify-start flex-wrap gap-2">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="h-6 bg-gray-200 rounded-2xl w-20"></div>
                    ))}
                </div>

                {/* Assets */}
                <div className="flex flex-col items-stretch justify-start gap-3">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>

                {/* Price */}
                <div className="price">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        </div>
    );
}

export function HomeSkeleton2() {
    return (
        <div className="lg:w-[382px] max-w-[400px] homecard w-[90%] mx-auto flex-grow lg:mx-0 p-1.5 grid grid-rows-2 gap-[25px] rounded-[10px] animate-pulse" 
             style={{ boxShadow: "0 0 7px rgba(0, 0, 0, .25)" }}>
            {/* Image Skeleton */}
            <div className="img-cont relative -z-20 h-[200px]">
                <div className="w-full h-full bg-gray-200 rounded-[10px]"></div>
                <div className="absolute top-0 right-0 w-[60px] h-[40px] bg-gray-300 rounded-tr-[10px] rounded-bl-[10px]"></div>
            </div>

            {/* Info Skeleton */}
            <div className="info flex flex-col items-stretch justify-start gap-[15px]">
                {/* Title and Rating */}
                <div className="infoF flex items-center justify-between">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex items-center justify-start flex-wrap gap-2">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="h-6 bg-gray-200 rounded-2xl w-20"></div>
                    ))}
                </div>

                {/* Assets */}
                <div className="flex flex-col items-stretch justify-start gap-3">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>

                {/* Price */}
                <div className="price">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        </div>
    );
}