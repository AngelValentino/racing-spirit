import '../styles/modal.css';
import { createContext, useContext, useState, useRef } from "react";
import { useEffect } from "react";
import SlideModal from "../layouts/SlideModal/SlideModal";

// Create context for the modal with an empty default value
const ModalContext = createContext({});

// Custom hook to use ModalContext
export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isCart, setIsCart ] = useState(false);
  const lastFocusableLmRef = useRef(null);
  const modalContentRef = useRef(null);
  const modalOverlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const timeoutId = useRef(null);

  // Open the modal and set its type
  const openModal = modalType => {
    setIsOpen(true);
    setIsCart(modalType === 'cart');
  }

  // Close the modal with a slide effect and an overlay opacity fade
  const closeModal = () => {
    document.body.style.overflow = 'auto'; // Enable scrolling once more when the modal is closed
    modalContentRef.current.style.right = '-' + (modalContentRef.current.offsetWidth + 50) + 'px'; // Slide modal content out of view
    modalOverlayRef.current.style.opacity = 0; // Fade out the modal overlay
    // Apply transition effects to the modal content and overlay only when closing, not opening
    modalContentRef.current.style.transition = 'right 0.25s';
    modalOverlayRef.current.style.transition = 'opacity 0.25s';
    // Reset Modal
    timeoutId.current = setTimeout(() => {
      setIsOpen(false);
      lastFocusableLmRef.current.focus(); // Return focus to the last focusable element before the modal opened
    }, 250);
  }

  const closeModalAtEsc = e => e.key === 'Escape' && closeModal();

  const closeModalAtOverlayClick = e => e.target.matches('.modal-overlay') && closeModal();

  // Trap focus within the modal for accessibility
  function trapFocus(e) {
    const focusableLms = modalContentRef.current.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    const firstFocusableLm = focusableLms[0]; 
    const lastFocusableLm = focusableLms[focusableLms.length - 1];
    const isTabPressed = (e.key === 'Tab');

    if (!isTabPressed) return; 

    if (e.shiftKey) /* shift + tab */ {
      if (document.activeElement === firstFocusableLm ) {
        lastFocusableLm.focus();
        e.preventDefault();
      }
    } 
    else /* tab */ {
      if (document.activeElement === lastFocusableLm) {
        firstFocusableLm.focus();
        e.preventDefault();
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      lastFocusableLmRef.current = document.activeElement;  // Store the last focused element before opening the modal
      closeBtnRef.current.focus(); // Focus the close button when the modal opens
      document.body.addEventListener('keydown', closeModalAtEsc);
      document.body.style.overflow = 'hidden'; // Disable scrolling when the modal is open
      modalContentRef.current.style.right = 0; // Slide modal content into view
      modalOverlayRef.current.style.opacity = 1; // Fade in the modal overlay
    } 

    return () => {
      clearTimeout(timeoutId.current);
      document.body.removeEventListener('keydown', closeModalAtEsc);
    }
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{
      isCart,
      lastFocusableLmRef,
      closeBtnRef,
      modalContentRef,
      modalOverlayRef,
      openModal, 
      closeModal,
      closeModalAtOverlayClick,
      trapFocus,
    }}>
      { children }
      { isOpen && <SlideModal /> }
    </ModalContext.Provider>
  );
}