import { createContext, useContext, useState, useRef } from "react";
import Modal from "../layouts/Modal";

const ModalContext = createContext({});

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({children}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const lastFocusableLm = useRef(null);
  const modalContent = useRef(null);
  const modalOverlay = useRef(null);
  const timeoutId = useRef(null);

  const openModal = (modalType) => {
    setIsOpen(true);
    if (modalType === 'cart') {
      setIsCart(true);
    }
    if (modalType === 'menu') {
      setIsCart(false);
    }
  }

  const closeModal = () => {
    document.body.style.overflow = 'auto';
    modalContent.current.style.right = '-500px';
    modalOverlay.current.style.opacity = 0;
    timeoutId.current = setTimeout(() => {
      setIsOpen(false);
      lastFocusableLm.current.focus();
    }, 500);
  }

  return (
    <ModalContext.Provider value={{
      isOpen, 
      isCart, 
      lastFocusableLm,
      modalContent,
      modalOverlay,
      timeoutId,
      openModal, 
      closeModal
    }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  )
}