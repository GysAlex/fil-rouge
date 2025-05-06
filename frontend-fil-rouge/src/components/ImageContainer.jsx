import { useState } from 'react';
import { useModal } from '../hooks/useModal';
import { ImageSliderModal } from '../containers/modals.jsx/ImageSliderModal';

export function ImageContainer({ images = [] }) {
    const { openModal } = useModal();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    
    // Trouver l'image principale
    const mainImage = images.find(img => img.is_main) || images[0];
    
    // Filtrer les images secondaires (exclure l'image principale)
    const secondaryImages = images.filter(img => img !== mainImage);
    
    // Obtenir les 4 premières images secondaires pour la grille
    const gridImages = secondaryImages.slice(0, 4);
    
    // Calculer le nombre d'images restantes
    const remainingImages = Math.max(0, secondaryImages.length - 3);

    const handleOpenSlider = (startIndex = 0) => {
        setSelectedImageIndex(startIndex);
        openModal(ImageSliderModal, {
            images: images,
            startIndex: startIndex
        });
    };

    return (
        <div className="grid lg:grid-cols-2 gap-[30px] h-fit">
            {/* Image principale */}
            <div 
                className="left w-full h-[90%] my-auto cursor-pointer overflow-hidden"
                onClick={() => handleOpenSlider(0)}
            >
                <img 
                    src={`http://localhost:8000/storage/${mainImage?.image_path}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                    alt={mainImage?.alt || "Image principale"} 
                />
            </div>

            {/* Grille d'images secondaires */}
            <div className="gr-image right md:grid md:grid-cols-2 md:grid-rows-2 gap-[14px]">
                {gridImages.slice(0, 3).map((image, index) => (
                    <div 
                        key={image.id}
                        className="lg:w-[288px] lg:h-[191px] cursor-pointer overflow-hidden"
                        onClick={() => handleOpenSlider(index + 1)}
                    >
                        <img 
                            src={`http://localhost:8000/storage/${image.image_path}`}
                            className="w-full h-full object-cover rounded-2xl transition-transform duration-300 hover:scale-105" 
                            alt={image.alt || `Image ${index + 1}`}
                        />
                    </div>
                ))}

                {/* Dernière case avec overlay pour images restantes */}
                {remainingImages > 0 && (
                    <button 
                        onClick={() => handleOpenSlider(4)}
                        className="lg:w-[288px] lg:h-[191px] relative cursor-pointer overflow-hidden group"
                    >
                        <img 
                            src={`http://localhost:8000/storage/${gridImages[3]?.image_path}`}
                            className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105" 
                            alt="Voir plus" 
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 group-hover:bg-black/60 transition-colors">
                            <span className="text-3xl text-white">
                                +{remainingImages} {remainingImages === 1 ? 'autre photo' : 'autres photos'}
                            </span>
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
}