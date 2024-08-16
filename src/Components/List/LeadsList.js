import React, { useState, useEffect } from 'react';
import LeadDragDrop from '../DragDrop/DragDrop';
import NewLeadModal from '../Modal/NewLeadModal/NewLeadModal';
import SucessModal from '../Modal/SucessModal/SucessModal';

function LeadsList() {
  const [sections, setSections] = useState({
    potential: [],
    confirmed: [],
    analysis: []
  });
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const loadLeads = () => {
    const leadsList = localStorage.getItem('leadData');
    if (leadsList) {
      const leadData = JSON.parse(leadsList);
      setSections({
        potential: leadData.filter((lead) => lead.status === 'potential'),
        confirmed: leadData.filter((lead) => lead.status === 'confirmed'),
        analysis: leadData.filter((lead) => lead.status === 'analysis')
      });
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    const allLeads = [
      ...sections.potential,
      ...sections.confirmed,
      ...sections.analysis
    ];
    localStorage.setItem('leadData', JSON.stringify(allLeads));
  }, [sections]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceSection = source.droppableId;
    const destinationSection = destination.droppableId;

    const isMoveValid =
      (sourceSection === 'potential' && destinationSection === 'confirmed') ||
      (sourceSection === 'confirmed' && destinationSection === 'analysis');

    if (!isMoveValid) {
      return;
    }

    const movedLead = sections[sourceSection][source.index];

    const updatedSourceSection = Array.from(sections[sourceSection]);
    updatedSourceSection.splice(source.index, 1);

    const updatedDestinationSection = Array.from(sections[destinationSection]);
    updatedDestinationSection.splice(destination.index, 0, { ...movedLead, status: destinationSection });

    setSections((prevSections) => ({
      ...prevSections,
      [sourceSection]: updatedSourceSection,
      [destinationSection]: updatedDestinationSection
    }));
  };

  const addNewLead = (newLead) => {
    setSections((prevSections) => ({
      ...prevSections,
      potential: [...prevSections.potential, newLead]
    }));
  };

  const openModalWithLead = (lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedLead(null);
  };

  return (
    <div>
      {isModalOpen ? (
        <NewLeadModal
          closeModal={closeModal}
          initialValues={selectedLead}
          onSave={addNewLead}
        />
      ) : (
        <LeadDragDrop sections={sections} onDragEnd={onDragEnd} onLeadClick={openModalWithLead} />
      )}
    </div>
  );
}

export default LeadsList;
