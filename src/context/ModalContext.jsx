import { createContext, useContext, useState, useRef } from "react";
import Modal from "../layouts/Modal";

const ModalContext = createContext({});

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const lastFocusableLm = useRef(null);
  const modalContent = useRef(null);
  const modalOverlay = useRef(null);
  const timeoutId = useRef(null);

  const openModal = modalType => {
    setIsOpen(true);
    setIsCart(modalType === 'cart');
  }

  const closeModal = () => {
    document.body.style.overflow = 'auto';
    modalContent.current.style.right = '-' + (modalContent.current.offsetWidth + 50) + 'px';
    modalOverlay.current.style.opacity = 0;
    modalContent.current.style.transition = 'right 0.25s';
    modalOverlay.current.style.transition = 'opacity 0.25s';
    timeoutId.current = setTimeout(() => {
      setIsOpen(false);
      lastFocusableLm.current.focus();
    }, 250);
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