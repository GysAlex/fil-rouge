import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ImageSliderModal({ images, startIndex = 0, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(startIndex);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col justify-between">
            {/* Header avec bouton fermer */}
            <div className="w-full p-4 flex justify-end">
                <button 
                    onClick={onClose}
                    className="text-white text-xl hover:text-gray-300 transition-colors"
                >
                    <i className="fa-solid fa-times"></i>
                </button>
            </div>

            {/* Section principale avec l'image courante */}
            <div className="flex-1 w-full flex items-center justify-center px-12 relative">
                <button 
                    onClick={handlePrevious}
                    className="absolute left-4 text-white text-3xl hover:text-gray-300"
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </button>

                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={`http://localhost:8000/storage/${images[currentIndex].image_path}`}
                        alt={images[currentIndex].alt}
                        className="max-h-[60vh] max-w-[80vw] object-contain mx-auto"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    />
                </AnimatePresence>

                <button 
                    onClick={handleNext}
                    className="absolute right-4 text-white text-3xl hover:text-gray-300"
                >
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>

            {/* Footer avec vignettes et indicateur */}
            <div className="w-full">
                {/* Indicateur de progression */}
                <div className="text-white text-center py-2">
                    {currentIndex + 1} / {images.length}
                </div>

                {/* Galerie de vignettes */}
                <div className="w-full flex items-center justify-center h-[20vh] bg-black/50">
                    <div className="max-w-[90vw] mx-auto h-full overflow-x-auto">
                        <motion.div 
                            className="flex gap-2 p-4 h-full"
                            drag="x"
                            dragConstraints={{ 
                                right: 0,
                                left: -(images.length * 150) + window.innerWidth - 32
                            }}
                        >
                            {images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    className={`flex-shrink-0 cursor-pointer transition-all duration-200 ${
                                        currentIndex === index 
                                            ? 'border-2 border-green-500 scale-95' 
                                            : 'opacity-50 hover:opacity-100'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCurrentIndex(index)}
                                >
                                    <img
                                        src={`http://localhost:8000/storage/${image.image_path}`}
                                        alt={image.alt}
                                        className="h-full w-32 object-cover rounded"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}