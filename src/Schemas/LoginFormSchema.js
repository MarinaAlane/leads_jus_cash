import * as Yup from 'yup';

const LoginFormSchema = Yup.object({
  email: Yup.string()
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .required('Senha é obrigatória')
});

export default LoginFormSchema;
