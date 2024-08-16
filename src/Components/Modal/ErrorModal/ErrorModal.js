import React from 'react';

const ErrorModal = ({ closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Ocorreu um problema ao salvar o lead.</h2>
        <h3>Tente novamente.</h3>
        <button className="modal-close" onClick={closeModal}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
