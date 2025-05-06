export function SearchBarSkeleton() {
    return (
        <div className="bg-white hidden z-20 relative py-5 px-10 h-fit min-h-[80px] gap-[30px] rounded-full md:flex items-center justify-center animate-pulse" 
             style={{boxShadow: "0 0 7px rgba(0, 0, 0, .25)"}}>
            {/* Input Région Skeleton */}
            <div className="w-[210px] relative flex-grow sm:flex-grow-0">
                <div className="flex flex-col gap-1">
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    <div className="h-8 w-full bg-gray-200 rounded-lg"></div>
                </div>
            </div>

            {/* Separator */}
            <div className="h-[30px] w-[2px] bg-gray-200"></div>

            {/* Input Université Skeleton */}
            <div className="w-[210px] relative flex-grow sm:flex-grow-0">
                <div className="flex flex-col gap-1">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    <div className="h-8 w-full bg-gray-200 rounded-lg"></div>
                </div>
            </div>

            {/* Button Skeleton */}
            <div className="h-[44px] w-[140px] bg-gray-200 rounded-full"></div>
        </div>
    );
}