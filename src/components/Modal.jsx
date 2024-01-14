import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#root');

export const Modal = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleDropClick = e => {
    if (e.currentTarget === e.target) {
      return onClose();
    }
  };
  return createPortal(
    <div className="Overlay" onClick={handleDropClick}>
      <div className="Modalx">
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};
