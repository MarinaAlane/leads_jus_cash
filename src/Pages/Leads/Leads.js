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
  const [leads, setLeads] = useState([]);
  const [list, setList] = useState(true)

  const openNewLeadModal = () => {
    setNewLeadModal(true);
    setSucessModal(false);
    setList(false)
  };

  const closeNewLeadModal = () => {
    setNewLeadModal(false);
    setList(true)
  };

  const openSucessModal = () => {
    setSucessModal(true);
    setNewLeadModal(false);
    setList(false)
  };

  const closeSucessModal = () => {
    setSucessModal(false);
    setList(true)
  };

  const openErrorModal = () => {
    setNewLeadModal(false);
    setErrorModal(true);
    setList(false)
  }

  const closeErrorModal = () => {
    setErrorModal(false);
    setList(true)
  }

  const handleAddLead = (newLead) => {
    setLeads(prevLeads => [...prevLeads, newLead]);
  };

  return (
    <div className='wrap-leads'>
      <img src={logo} alt="logo JusCash" />
      {newLeadModal && (
        <NewLeadModal
          closeModal={closeNewLeadModal}
          openSucessModal={openSucessModal}
          openErrorModal={openErrorModal}
          addLead={handleAddLead}
        />
      )}
      {!newLeadModal && (
        <div className='wrap-button'>
          <button onClick={openNewLeadModal}> + Novo Lead</button>
        </div>
      )}
      {sucessModal && <SucessModal closeModal={closeSucessModal} />}
      {errorModal && <ErrorModal closeModal={closeErrorModal} />}
      {list && <LeadsList leads={leads} />}
    </div>
  );
}

export default Leads;
