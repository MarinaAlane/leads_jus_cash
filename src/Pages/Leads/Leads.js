import React, { useState } from 'react';
import logo from '../../Assets/logo.png';
import NewLeadModal from '../../Components/Modal/NewLeadModal/NewLeadModal';
import SucessModal from '../../Components/Modal/SucessModal/SucessModal';
import ErrorModal from '../../Components/Modal/ErrorModal/ErrorModal';
import './Leads.styles.css';
import LeadsList from '../../Components/List/LeadsList';

function Leads() {
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

  const closeErrorModal = () => {
    setErrorModal(false);
  }

  return (
    <div>
      <img src={logo} alt="logo JusCash" />
      {newLeadModal && (
        <NewLeadModal
          closeModal={closeNewLeadModal}
          openSucessModal={openSucessModal}
          openErrorModal={openErrorModal}
        />
      )}
      {!newLeadModal && (
        <>
          <button onClick={openNewLeadModal}> + Novo Lead</button>
        </>
      )}
      {sucessModal && <SucessModal closeModal={closeSucessModal} />}
      {errorModal && <ErrorModal closeModal={closeErrorModal} />}
      <LeadsList />
    </div>
  );
}

export default Leads;
