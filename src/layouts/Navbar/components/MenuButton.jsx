const MenuButton = ({ openModal, menuType }) => {
  return ( 
    <button title="Menu" aria-label="Open menu." className="menu-btn" onClick={() => {
      openModal(menuType);
    }}>
      <svg className="menu-btn__icon" aria-hidden="true" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="currentColor" d="M3 4h18v2H3zm0 7h12v2H3zm0 7h18v2H3z" />
      </svg>
    </button>
  );
}
 
export default MenuButton;