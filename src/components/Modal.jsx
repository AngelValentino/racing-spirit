import { useModal } from "../context/ModalContext";
import CartModal from "./CartModal";
import { useEffect, useRef } from "react";

const Modal = () => {
  const { 
    isOpen, 
    isCart, 
    closeModal, 
    lastFocusableLm, 
    modalContent, 
    modalOverlay, 
    timeoutId 
  } = useModal();
  const closeBtn = useRef(null);

  function closeModalAtEsc(e) {
    console.log(e)
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  function trapFocus(e) {
    const focusableLms = modalContent.current.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    const firstFocusableLm = focusableLms[0]; 
    const lastFocusableLm = focusableLms[focusableLms.length - 1];
    const isTabPressed = (e.key === 'Tab');

    if (!isTabPressed) { 
      return; 
    }

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
      lastFocusableLm.current = document.activeElement;
      closeBtn.current.focus();
      document.body.addEventListener('keydown', closeModalAtEsc);
      document.body.style.overflow = 'hidden';
      modalContent.current.style.right = 0;
      modalOverlay.current.style.opacity = 1;
    } 

    return () => {
      clearTimeout(timeoutId.current);
      document.body.removeEventListener('keydown', closeModalAtEsc);
    }
  }, [isOpen]);

  return ( 
    <>
      {isOpen && 
        <div  className="modal-container" onClick={(e) => {
          if (e.target.matches('.modal-overlay')) {
            closeModal();
          }
        }}>
          <div ref={modalContent} className="modal-content" onKeyDown={trapFocus}>
            <button ref={closeBtn} className="modal__close-btn" onClick={() => {
              closeModal('cart');
            }}>close</button>
            { isCart && <CartModal closeBtn={closeBtn} />}
          </div>
          <div ref={modalOverlay} className="modal-overlay"></div>
        </div>
        }
    </>
  );
}
 
export default Modal;