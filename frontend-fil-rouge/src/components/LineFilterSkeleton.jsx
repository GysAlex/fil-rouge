import React from 'react';

export function LineFilterSkeleton() {
    // Créer un tableau de largeurs variées pour les tags
    const tagWidths = ['w-20', 'w-28', 'w-24', 'w-32', 'w-26', 'w-24', 'w-28', 'w-24', 'w-32'];

    return (
        <div className='max-w-[1000px] z-5 xl:w-full lg:w-[90%] w-[80%] mx-auto mt-[20px] md:mt-[90px] md:relative sticky top-[89px] md:top-0'>
            <div className="animate-pulse relative">
                {/* Container pour les tags */}
                <div className="flex items-center gap-2 overflow-hidden">
                    {tagWidths.map((width, index) => (
                        <div 
                            key={index} 
                            className={`${width} h-10 bg-gray-200 rounded-2xl flex-shrink-0`}
                        ></div>
                    ))}
                </div>

                {/* Flèches de navigation */}
                <div className="flex items-center w-full justify-between gap-6 absolute top-[50%]" style={{transform: "translateY(-50%)"}}>
                    <div className="p-2.5 size-12 rounded-full bg-gray-200"></div>
                    <div className="p-2.5 size-12 rounded-full bg-gray-200"></div>
                </div>
            </div>
        </div>
    );
}