import React, { useState } from 'react';

import logo from '../../Assets/logo.png';
import NewLeadModal from '../../Components/Modal/NewLeadModal/NewLeadModal';
import SucessModal from '../../Components/Modal/SucessModal/SucessModal';
import ErrorModal from '../../Components/Modal/ErrorModal/ErrorModal';

import './Leads.styles.css';

function Leads() {
  const userData = JSON.parse(localStorage.getItem('userFormData'));
  const [newLeadModal, setNewLeadModal] = useState(false);
  const [sucessModal, setSucessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const openNewLeadModal = () => {
    setNewLeadModal(true);
    setSucessModal(false);
  };

  const closeNewLeadModal = () => {
    setNewLeadModal(false);
  };

  const openSucessModal = () => {
    setSucessModal(true);
    setNewLeadModal(false);
  };

  const closeSucessModal = () => {
    setSucessModal(false);
  };

  const openErrorModal = () => {
    setNewLeadModal(false);
    setErrorModal(true);
  }
  const closeErrorModal = () => setErrorModal(false);

  if (!userData) {
    return <p>Não há dados disponíveis.</p>;
  }

  return (
    <div>
      <img src={logo} alt="logo JusCash" />
      {newLeadModal && (
        <NewLeadModal
          closeModal={closeNewLeadModal}
          openSucessModal={openSucessModal}
          openErrorModal={openErrorModal} // Passando `openErrorModal` como prop
        />
      )}
      {!newLeadModal && (
        <>
          <button onClick={openNewLeadModal}> + Novo Lead</button>
          <div className='section-container'>
            <section className='title-list'>Cliente Potencial</section>
            <section className='title-list middle-section'>Dados Confirmados</section>
            <section className='title-list'>Análise do Lead</section>
          </div>
        </>
      )}
      {sucessModal && <SucessModal closeModal={closeSucessModal} />}
      {errorModal && <ErrorModal closeModal={closeErrorModal} />}
    </div>
  );
}

export default Leads;
