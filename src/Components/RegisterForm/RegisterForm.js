import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import logo from '../../Assets/logo.png';
import RegisterFormSchema from '../../Schemas/RegisterFormSchema';
import showIcon from '../../Assets/show_icon.png';
import hideIcon from '../../Assets/hide_icon.png';

import './RegisterForm.styles.css';

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(prevState => !prevState);
  };

  const initialValues = {
    nome: '',
    email: '',
    password: '',
    confirmationPassword: ''
  };

  const handleSubmit = (values) => {
    localStorage.setItem('userFormData', JSON.stringify(values));
    console.log('Dados salvos no localStorage:', values);
    navigate('/leads');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="register-form">
        <img src={logo} alt="logo JusCash" />
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterFormSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div>
                <label htmlFor="nome">Seu nome completo</label>
                <label htmlFor="required">*</label>
                <Field className="form-group" type="text" id="nome" name="nome" placeholder="MARIA DOS SANTOS" />
                <ErrorMessage name="nome" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="email">E-mail</label>
                <Field className="form-group" type="email" id="email" name="email" placeholder="email@example.com" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="password">Senha</label>
                <label htmlFor="required">*</label>
                <div className="password-container">
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="********"
                    className="form-group"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={handleTogglePassword}
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    <img
                      src={showPassword ? showIcon : hideIcon}
                      alt={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                      className="password-icon"
                    />
                  </button>
                </div>
                <ErrorMessage name="senha" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="confirmationPassword">Confirme a senha</label>
                <label htmlFor="required">*</label>
                <div className="password-container">
                  <Field
                    className="form-group"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmationPassword"
                    name="confirmationPassword"
                    placeholder="********"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={handleToggleConfirmPassword}
                    aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    <img
                      src={showConfirmPassword ? showIcon : hideIcon}
                      alt={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                      className="password-icon"
                    />
                  </button>
                </div>
                <ErrorMessage name="confirmationPassword" component="div" className="error" />
              </div>

              <div>
                <span onClick={handleLogin}>Já possui uma conta? Fazer o login</span>
                <button type="submit" className="submit-button">Criar conta</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default RegisterForm;
