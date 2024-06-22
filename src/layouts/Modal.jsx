import { useModal } from "../context/ModalContext";
import Cart from "./Cart/Cart";
import { useEffect, useRef } from "react";
import SlideMenu from "./SlideMenu/SlideMenu";
import { Link } from "react-router-dom";
import '../styles/modal.css';

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

  const closeModalAtEsc = e => e.key === 'Escape' && closeModal();

  const closeModalAtOverlayClick = e => e.target.matches('.modal-overlay') && closeModal();

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
        <div className="modal-container" onClick={closeModalAtOverlayClick}>
          <div ref={modalContent} className="modal-content" onKeyDown={trapFocus}>
            <section className="modal-header">
              <h1 className="modal-title">
                { isCart 
                  ? 'Cart' 
                  : <Link aria-label="Go to home." title="Home" to="/" onClick={closeModal}>
                      <img aria-hidden="true" role="presentation" src="https://i.imgur.com/kLOpHbk.png" />
                    </Link>
                }
              </h1>
              <button aria-label="Close modal." title="Close" ref={closeBtn} className="modal__close-btn" onClick={closeModal}>
                <svg className="modal__close-icon" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path fill="currentColor" d="m4.3 2.9l12.8 12.8l-1.4 1.4L2.9 4.3z" />
                  <path fill="currentColor" d="M17.1 4.3L4.3 17.1l-1.4-1.4L15.7 2.9z" />
                </svg>
              </button>
            </section>
            { isCart ? <Cart closeBtn={closeBtn} /> : <SlideMenu />}
          </div>
          <div ref={modalOverlay} className="modal-overlay"></div>
        </div>
      }
    </>
  );
}
 
export default Modal;