import * as Yup from 'yup';

const RegisterFormSchema = Yup.object({
  nome: Yup.string()
    .required('Nome é obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .required('Senha é obrigatória')
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .matches(/(?=.*[A-Z])/, 'Senha deve conter pelo menos uma letra maiúscula')
    .matches(/(?=.*[a-z])/, 'Senha deve conter pelo menos uma letra minúscula')
    .matches(/(?=.*[0-9])/, 'Senha deve conter pelo menos um número')
    .matches(/(?=.*[@$!%*?&])/, 'Senha deve conter pelo menos um caractere especial'),
  confirmationPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Senhas devem corresponder')
    .required('Confirmação de senha é obrigatória')
});

export default RegisterFormSchema;
