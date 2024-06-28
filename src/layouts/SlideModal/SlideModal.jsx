import { Link } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import Cart from "./Cart/Cart";
import MobileMenu from "./MobileMenu/MobileMenu";

const SlideModal = () => {
  const { 
    isCart,
    closeBtnRef,
    modalContentRef,
    modalOverlayRef,
    closeModal,
    closeModalAtOverlayClick,
    trapFocus,
  } = useModal();

  return ( 
    <div className="modal-container" onClick={closeModalAtOverlayClick}>
      <div ref={modalContentRef} className="modal-content" onKeyDown={trapFocus}>
        <section className="modal-header">
          <h1 className="modal-title">
            { isCart 
              ? 'Cart' 
              : <Link aria-label="Go to home." title="Home" to="/" onClick={closeModal}>
                  <img aria-hidden="true" role="presentation" src="https://i.imgur.com/kLOpHbk.png" />
                </Link>
            }
          </h1>
          <button aria-label="Close modal." title="Close" ref={closeBtnRef} className="modal__close-btn" onClick={closeModal}>
            <svg className="modal__close-icon" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fill="currentColor" d="m4.3 2.9l12.8 12.8l-1.4 1.4L2.9 4.3z" />
              <path fill="currentColor" d="M17.1 4.3L4.3 17.1l-1.4-1.4L15.7 2.9z" />
            </svg>
          </button>
        </section>
        { isCart ? <Cart /> : <MobileMenu /> }
      </div>
      <div ref={modalOverlayRef} className="modal-overlay"></div>
    </div>
  );
}
 
export default SlideModal;