import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";

export const ModalContainer = () => {
    const { modalState, closeModal } = useModal();
  
  
    if (!modalState.isOpen) {
        return null;
    }
  
    const ModalContent = modalState.content // C'est vraiment brillant d'y avoir pensé
  
    return (
        <div className={`modal2 ${modalState.isOpen ? 'fixed h-[100%] top-0 left-0 w-[100%] z-100 flex items-start justify-center show' : 'fixed h-[100%] top-0 left-0 w-[100%] z-100 flex items-start justify-center'}`}>
            <ModalContent {...modalState.props} onClose={closeModal} />
        </div>
    );
  };