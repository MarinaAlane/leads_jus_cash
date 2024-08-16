import React from 'react';

const SucessModal = ({ closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Dados Salvos com Sucesso!</h2>
        <button className="modal-close" onClick={closeModal}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default SucessModal;
