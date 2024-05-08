import { useModal } from "../context/ModalContext";
import CartModal from "./CartModal";

const Modal = () => {
  const { isOpen, isCart, closeModal} = useModal();

  return ( 
    <>
      {isOpen && 
      <div className="modal-overlay" onClick={((e) => {
        if (e.target.matches('.modal-overlay')) {
          closeModal('cart');
        }
      })}>
        <div className="modal-content">
          <button className="modal__close-btn" onClick={() => {
            closeModal('cart');
          }}>close</button>
          { isCart && <CartModal />}
        </div>
      </div>}
    </>
  );
}
 
export default Modal;