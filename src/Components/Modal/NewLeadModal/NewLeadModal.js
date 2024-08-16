import React from 'react';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import NewLeadFormSchema from '../../../Schemas/NewLeadFormSchema';
import closeIcon from '../../../Assets/close.png';
import './NewLeadModal.styles.css';

const NewLeadModal = ({ closeModal, openSucessModal, initialValues = {}, onSave }) => {
  const optionsList = [
    'Honorários Sucumbenciais',
    'Honorários Contratuais',
    'Honorários Dativos',
    'Crédito do Autor'
  ];

  const isEditMode = Boolean(initialValues.id);

  const handleSubmit = (values) => {
    const existingLeads = JSON.parse(localStorage.getItem('leadData')) || [];
    const newId = values.id || `lead-${existingLeads.length}`;
    const newLead = { ...values, id: newId, status: 'potential' };

    const updatedLeads = isEditMode
      ? existingLeads.map((lead) => (lead.id === newLead.id ? newLead : lead))
      : [...existingLeads, newLead];

    localStorage.setItem('leadData', JSON.stringify(updatedLeads));
    onSave?.(newLead);
    openSucessModal();
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={closeModal}>
          <img src={closeIcon} alt="Fechar Modal" />
        </button>
        <h2>{isEditMode ? 'Lead' : 'Novo Lead'}</h2>
        <h3>Dados do Lead</h3>

        <Formik
          initialValues={{
            name: initialValues.name || '',
            email: initialValues.email || '',
            phone: initialValues.phone || '',
            options: initialValues.options || [],
            id: initialValues.id || ''
          }}
          validationSchema={NewLeadFormSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => {
            const allSelected = optionsList.every(option => values.options.includes(option));
            return (
              <Form>
                <Field
                  className="form-group-modal"
                  type="text"
                  name="name"
                  placeholder="Nome Completo*"
                  disabled={isEditMode}
                />
                <ErrorMessage name="name" component="div" className="error-message" />

                <Field
                  className="form-group-modal"
                  type="email"
                  name="email"
                  placeholder="Email*"
                  disabled={isEditMode}
                />
                <ErrorMessage name="email" component="div" className="error-message" />
                <Field
                  className="form-group-modal"
                  type="text"
                  name="phone"
                  placeholder="Telefone*"
                  disabled={isEditMode}
                />
                <ErrorMessage name="phone" component="div" className="error-message" />
                <h3>Oportunidades</h3>
                <label className="toppings-list-item">
                  <div>
                    <Field
                      type="checkbox"
                      name="selectAll"
                      checked={allSelected}
                      onChange={() => {
                        const newOptions = allSelected ? [] : optionsList;
                        setFieldValue('options', newOptions);
                      }}
                      disabled={isEditMode}
                    />
                    Todos
                  </div>
                </label>
                {optionsList.map((option, index) => (
                  <label key={index} className="toppings-list-item">
                    <div>
                      <Field
                        type="checkbox"
                        name="options"
                        value={option}
                        checked={values.options.includes(option)}
                        onChange={() => {
                          const newOptions = values.options.includes(option)
                            ? values.options.filter(o => o !== option)
                            : [...values.options, option];
                          setFieldValue('options', newOptions);
                        }}
                        disabled={isEditMode}
                      />
                      {option}
                    </div>
                  </label>
                ))}
                {!isEditMode && (
                  <div className="button-wrapper">
                    <button type="button" className="cancel-button" onClick={closeModal}>
                      Cancelar
                    </button>
                    <button type="submit" className="create-button">
                      Salvar
                    </button>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default NewLeadModal;
