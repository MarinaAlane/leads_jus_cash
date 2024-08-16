import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

import logo from '../../Assets/logo.png';

function LoginForm() {
  const initialValues = {
    password: '',
    email: ''
  };

  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    const userInfo = localStorage.getItem('userFormData');

    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);

      if (parsedUserInfo.email === values.email && parsedUserInfo.password === values.password) {
        navigate('/leads');
      } else {
        setErrors({ email: 'Email ou senha incorretos', password: 'Email ou senha incorretos' });
      }
    } else {
      setErrors({ email: 'Usuário não encontrado', password: 'Usuário não encontrado' });
    }

    setSubmitting(false);
  };

  return (
    <>
      <img src={logo} alt="logo JusCash" />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div>
              <label htmlFor="email">E-mail</label>
              <Field className="form-group" type="email" id="email" name="email" placeholder="email@example.com" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="password">Senha</label>
              <Field className="form-group" type="password" id="password" name="password" placeholder="******" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" className="submit-button">Entrar</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;
