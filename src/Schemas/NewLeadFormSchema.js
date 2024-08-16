import * as Yup from 'yup'

const NewLeadFormSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  name: Yup.string().required('Nome completo é obrigatório'),
  phone: Yup.string().matches(/^\d+$/, 'Telefone deve conter apenas números').required('Telefone é obrigatório'),
  options: Yup.array().of(Yup.string()).min(1, 'Pelo menos uma opção deve ser selecionada')
});


export default NewLeadFormSchema;
