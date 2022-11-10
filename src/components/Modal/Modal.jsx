import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Modal } from './Modal.styled';

const modal = document.querySelector('#modal');

export const ModalWindow = ({ src, alt, onClose }) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') onClose();
  
  };
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) onClose();
  };
  


  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.removeEventListener('keydown', handleKeyDown);
  }
   

  );

 

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Modal>
        <img src={src} alt={alt} />
      </Modal>
    </Overlay>,
    modal
  );
}


  ModalWindow.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    onClose: PropTypes.func.isRequired,
  };
