import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({children}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCart, setIsCart] = useState(false);

  const openModal = (modalType) => {
    setIsOpen(true);
    if (modalType === 'cart') {
      setIsCart(true);
    }
  }

  const closeModal = (modalType) => {
    setIsOpen(false);
    if (modalType === 'cart') {
      setIsCart(true);
    }
  }

  return (
    <ModalContext.Provider value={{isOpen, isCart, openModal, closeModal}}>
      {children}
    </ModalContext.Provider>
  )
}